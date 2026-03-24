"use client"

import { useEffect, useRef } from "react"
import maplibregl, { type Map as MapLibreMap, type Marker } from "maplibre-gl"

import {
  getCompanyLogoUrl,
  getCompanyMonogram,
  type Company,
  type CompanyCategory,
} from "@/lib/companies"

type MapShellProps = {
  companies: Company[]
  selectedCompany: Company
  onSelectCompany: (slug: string) => void
}

const SF_CENTER: [number, number] = [-122.4167, 37.7793]
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"

const CATEGORY_COLORS: Record<CompanyCategory, string> = {
  "Core Labs": "#ff6b6b",
  "Consumer AI": "#4ecdc4",
  Devtools: "#ffe66d",
  Infra: "#a855f7",
  Agents: "#3b82f6",
  "Vertical AI": "#ff9f43",
}

// Apply toy-city 3D style — Silicon Valley opening vibe
function apply3DStyle(map: MapLibreMap) {
  // Background — warm sandy ground like a model diorama
  map.setPaintProperty("background", "background-color", "#e6d8b8")

  // Landcover — vivid cartoon grass
  map.setPaintProperty("landcover", "fill-color", "#7cc866")
  map.setPaintProperty("landcover", "fill-opacity", 0.9)

  // Parks — bright lush green (toy trees / astroturf vibe)
  map.setPaintProperty("park_national_park", "fill-color", "#4db848")
  map.setPaintProperty("park_national_park", "fill-opacity", 0.85)
  map.setPaintProperty("park_nature_reserve", "fill-color", "#4db848")
  map.setPaintProperty("park_nature_reserve", "fill-opacity", 0.85)

  // Residential — light warm sand
  map.setPaintProperty("landuse_residential", "fill-color", "#ede0c8")

  // Other landuse — pale warm
  map.setPaintProperty("landuse", "fill-color", "#f0e8d4")

  // Water — rich saturated teal (like the SV opening)
  map.setPaintProperty("water", "fill-color", "#2ba5b5")
  map.setPaintProperty("water_shadow", "fill-color", "#1e8a98")

  // Waterway
  map.setPaintProperty("waterway", "line-color", "#2ba5b5")
  map.setPaintProperty("waterway", "line-width", 2)

  // Flat buildings — toy colored
  map.setPaintProperty("building", "fill-color", "#d4bfa8")
  map.setPaintProperty("building", "fill-opacity", 0.8)
  map.setPaintProperty("building-top", "fill-color", "#e0d0bc")
  map.setPaintProperty("building-top", "fill-opacity", 0.9)

  // Roads — dark asphalt with light sidewalks (toy road feel)
  const roadCases = [
    "road_service_case", "road_minor_case",
    "road_pri_case_ramp", "road_trunk_case_ramp", "road_mot_case_ramp",
    "road_sec_case_noramp", "road_pri_case_noramp",
    "road_trunk_case_noramp", "road_mot_case_noramp",
  ]
  roadCases.forEach((id) => map.setPaintProperty(id, "line-color", "#555555"))

  const roadFills = [
    "road_service_fill", "road_minor_fill",
    "road_pri_fill_ramp", "road_trunk_fill_ramp", "road_mot_fill_ramp",
    "road_sec_fill_noramp", "road_pri_fill_noramp",
  ]
  roadFills.forEach((id) => map.setPaintProperty(id, "line-color", "#888888"))

  // Main roads — slightly yellow-tinted (like toy road mats)
  map.setPaintProperty("road_trunk_fill_noramp", "line-color", "#999999")
  map.setPaintProperty("road_mot_fill_noramp", "line-color", "#777777")

  map.setPaintProperty("road_path", "line-color", "#c0a880")

  map.setPaintProperty("rail", "line-color", "#666666")
  map.setPaintProperty("rail_dash", "line-color", "#e6d8b8")

  // Tunnels
  const tunnelCases = [
    "tunnel_service_case", "tunnel_minor_case", "tunnel_sec_case",
    "tunnel_pri_case", "tunnel_trunk_case", "tunnel_mot_case",
  ]
  tunnelCases.forEach((id) => map.setPaintProperty(id, "line-color", "#888888"))

  const tunnelFills = [
    "tunnel_service_fill", "tunnel_minor_fill", "tunnel_sec_fill",
    "tunnel_pri_fill", "tunnel_trunk_fill", "tunnel_mot_fill",
  ]
  tunnelFills.forEach((id) => map.setPaintProperty(id, "line-color", "#aaaaaa"))

  // Bridges
  const bridgeCases = [
    "bridge_service_case", "bridge_minor_case", "bridge_sec_case",
    "bridge_pri_case", "bridge_trunk_case", "bridge_mot_case",
  ]
  bridgeCases.forEach((id) => map.setPaintProperty(id, "line-color", "#444444"))

  const bridgeFills = [
    "bridge_service_fill", "bridge_minor_fill", "bridge_sec_fill",
    "bridge_pri_fill", "bridge_trunk_fill", "bridge_mot_fill",
  ]
  bridgeFills.forEach((id) => map.setPaintProperty(id, "line-color", "#999999"))

  // Boundaries
  map.setPaintProperty("boundary_county", "line-color", "#c8a888")
  map.setPaintProperty("boundary_state", "line-color", "#b09070")

  // Labels — dark warm
  const placeLabels = [
    "place_hamlet", "place_suburbs", "place_villages",
    "place_town", "place_city_r6", "place_city_r5",
  ]
  placeLabels.forEach((id) => {
    map.setPaintProperty(id, "text-color", "#4a3a2a")
    map.setPaintProperty(id, "text-halo-color", "#e6d8b8")
    map.setPaintProperty(id, "text-halo-width", 1.5)
  })

  const cityDots = [
    "place_city_dot_r7", "place_city_dot_r4", "place_city_dot_r2",
    "place_city_dot_z7", "place_capital_dot_z7",
  ]
  cityDots.forEach((id) => {
    map.setPaintProperty(id, "text-color", "#3a2a1a")
    map.setPaintProperty(id, "text-halo-color", "#e6d8b8")
    map.setPaintProperty(id, "text-halo-width", 1.5)
  })

  map.setPaintProperty("place_state", "text-color", "#7a6a5a")
  map.setPaintProperty("place_country_1", "text-color", "#5a4a3a")
  map.setPaintProperty("place_country_2", "text-color", "#5a4a3a")

  const waterLabels = [
    "watername_ocean", "watername_sea", "watername_lake",
    "watername_lake_line", "waterway_label",
  ]
  waterLabels.forEach((id) => {
    map.setPaintProperty(id, "text-color", "#1a6a78")
    map.setPaintProperty(id, "text-halo-color", "#2ba5b5")
    map.setPaintProperty(id, "text-halo-width", 1)
  })

  map.setPaintProperty("poi_park", "text-color", "#2a7a2a")
  map.setPaintProperty("poi_stadium", "text-color", "#5a4a3a")

  // Aeroway
  map.setPaintProperty("aeroway-runway", "line-color", "#999999")
  map.setPaintProperty("aeroway-taxiway", "line-color", "#aaaaaa")

}

function createSignMarker(
  company: Company,
  active: boolean,
  dense: boolean
) {
  const monogram = getCompanyMonogram(company)
  const size = dense ? (active ? 30 : 22) : active ? 34 : 26
  const logoSize = dense ? (active ? 18 : 12) : active ? 22 : 16
  const legH = dense ? (active ? 5 : 3) : active ? 7 : 4

  const wrapper = document.createElement("div")
  wrapper.style.display = "flex"
  wrapper.style.flexDirection = "column"
  wrapper.style.alignItems = "center"

  // White sign panel — logo only
  const face = document.createElement("div")
  face.style.width = `${size}px`
  face.style.height = `${size}px`
  face.style.background = "#ffffff"
  face.style.borderRadius = "4px 4px 0 0"
  face.style.display = "flex"
  face.style.alignItems = "center"
  face.style.justifyContent = "center"
  face.style.boxShadow = active
    ? "0 2px 12px rgba(0,0,0,0.35)"
    : "0 1px 6px rgba(0,0,0,0.2)"
  if (active) {
    face.style.outline = "2px solid rgba(0,0,0,0.12)"
  }

  const image = document.createElement("img")
  image.src = getCompanyLogoUrl(company)
  image.alt = `${company.name} logo`
  image.style.width = `${logoSize}px`
  image.style.height = `${logoSize}px`
  image.style.objectFit = "contain"

  image.addEventListener("error", () => {
    image.replaceWith(createFallback(monogram, active, dense))
  })
  face.appendChild(image)

  // Bottom edge — thin dark strip for depth
  const bottom = document.createElement("div")
  bottom.style.width = `${size}px`
  bottom.style.height = `${active ? 3 : 2}px`
  bottom.style.background = "#888"
  bottom.style.borderRadius = "0 0 1px 1px"

  // Two support legs
  const legs = document.createElement("div")
  legs.style.display = "flex"
  legs.style.justifyContent = "center"
  legs.style.gap = `${Math.round(size * 0.45)}px`
  for (let i = 0; i < 2; i++) {
    const leg = document.createElement("div")
    leg.style.width = "2px"
    leg.style.height = `${legH}px`
    leg.style.background = "#999"
    legs.appendChild(leg)
  }

  // Ground shadow
  const shadow = document.createElement("div")
  shadow.style.width = `${Math.round(size * 0.6)}px`
  shadow.style.height = "3px"
  shadow.style.background = "rgba(0,0,0,0.12)"
  shadow.style.borderRadius = "50%"
  shadow.style.filter = "blur(1px)"

  wrapper.appendChild(face)
  wrapper.appendChild(bottom)
  wrapper.appendChild(legs)
  wrapper.appendChild(shadow)

  return wrapper
}

function createFallback(monogram: string, active: boolean, dense: boolean) {
  const el = document.createElement("span")
  el.textContent = monogram
  el.style.fontSize = dense
    ? active ? "10px" : "8px"
    : active ? "12px" : "9px"
  el.style.fontWeight = "700"
  el.style.lineHeight = "1"
  el.style.color = "#333"
  return el
}

export function MapShell({
  companies,
  selectedCompany,
  onSelectCompany,
}: MapShellProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markersRef = useRef<Map<string, Marker>>(new Map())
  const hasInteractedRef = useRef(false)
  const dense = companies.length >= 60

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }

    const markers = markersRef.current
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: SF_CENTER,
      zoom: 12.15,
      minZoom: 11.1,
      maxZoom: 15.8,
      attributionControl: false,
    })

    map.dragRotate.disable()
    map.touchZoomRotate.disableRotation()
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    )
    map.on("load", () => {
      apply3DStyle(map)
      map.resize()
    })
    mapRef.current = map

    const resizeObserver = new ResizeObserver(() => {
      map.resize()
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      markers.forEach((marker) => marker.remove())
      markers.clear()
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) {
      return
    }

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    companies.forEach((company) => {
      const active = company.slug === selectedCompany.slug
      const element = document.createElement("button")
      element.type = "button"
      element.setAttribute("aria-label", company.name)
      element.style.cursor = "pointer"
      element.style.padding = "0"
      element.style.outline = "none"
      element.style.background = "none"
      element.style.border = "none"
      element.appendChild(createSignMarker(company, active, dense))
      element.addEventListener("click", () => onSelectCompany(company.slug))

      const marker = new maplibregl.Marker({ element, anchor: "bottom" })
        .setLngLat(company.coordinates)
        .addTo(map)

      markersRef.current.set(company.slug, marker)
    })
  }, [companies, dense, onSelectCompany, selectedCompany.slug])

  useEffect(() => {
    markersRef.current.forEach((marker, slug) => {
      const button = marker.getElement() as HTMLButtonElement
      const active = slug === selectedCompany.slug
      const company = companies.find((item) => item.slug === slug)

      button.style.zIndex = active ? "10" : "1"
      if (company) {
        button.replaceChildren(createSignMarker(company, active, dense))
      }
    })
  }, [companies, dense, selectedCompany])

  useEffect(() => {
    const map = mapRef.current
    if (!map) {
      return
    }

    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true
      return
    }

    map.flyTo({
      center: selectedCompany.coordinates,
      zoom: 13.35,
      speed: 0.65,
      curve: 1.2,
      essential: true,
    })
  }, [selectedCompany])

  return (
    <div className="relative h-full overflow-hidden bg-[#e8ddd0] lg:min-h-160">
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute top-4 left-4 rounded-xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
        <div className="font-[family-name:var(--font-pixel)] text-[8px] uppercase tracking-wider text-[#ff6b6b]">
          SF AI Startup Map
        </div>
        <p className="mt-1 max-w-[200px] text-[11px] leading-4 text-[#5a4a3a]">
          Source-backed locations only.
        </p>
      </div>
      <div className="pointer-events-none absolute right-4 bottom-4 rounded-lg bg-white/90 px-3 py-1.5 shadow-md backdrop-blur-sm">
        <span className="font-[family-name:var(--font-pixel)] text-[7px] text-[#5a4a3a]">
          ► {selectedCompany.name}
        </span>
      </div>
      <div className="pointer-events-none absolute right-4 top-16 flex flex-col gap-1">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div
            key={cat}
            className="flex items-center gap-1.5 rounded-md bg-white/80 px-2 py-0.5 backdrop-blur-sm"
          >
            <div
              className="size-2.5 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-[9px] font-medium text-[#5a4a3a]">
              {cat}
            </span>
          </div>
        ))}
      </div>
      <style jsx global>{`
        .maplibregl-ctrl-group {
          border-radius: 8px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          border: none !important;
          overflow: hidden;
        }

        .maplibregl-ctrl-group button {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  )
}
