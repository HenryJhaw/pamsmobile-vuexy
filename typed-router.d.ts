/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    '$error': RouteRecordInfo<'$error', '/:error(.*)', { error: ParamValue<true> }, { error: ParamValue<false> }>,
    'activities': RouteRecordInfo<'activities', '/activities', Record<never, never>, Record<never, never>>,
    'analytics': RouteRecordInfo<'analytics', '/analytics', Record<never, never>, Record<never, never>>,
    'areas': RouteRecordInfo<'areas', '/areas', Record<never, never>, Record<never, never>>,
    'article': RouteRecordInfo<'article', '/article', Record<never, never>, Record<never, never>>,
    'attendance': RouteRecordInfo<'attendance', '/attendance', Record<never, never>, Record<never, never>>,
    'building': RouteRecordInfo<'building', '/building', Record<never, never>, Record<never, never>>,
    'checking': RouteRecordInfo<'checking', '/checking', Record<never, never>, Record<never, never>>,
    'department': RouteRecordInfo<'department', '/department', Record<never, never>, Record<never, never>>,
    'directory': RouteRecordInfo<'directory', '/directory', Record<never, never>, Record<never, never>>,
    'document': RouteRecordInfo<'document', '/document', Record<never, never>, Record<never, never>>,
    'facility-booking': RouteRecordInfo<'facility-booking', '/facility-booking', Record<never, never>, Record<never, never>>,
    'findings-information': RouteRecordInfo<'findings-information', '/findings-information', Record<never, never>, Record<never, never>>,
    'floor': RouteRecordInfo<'floor', '/floor', Record<never, never>, Record<never, never>>,
    'gallery': RouteRecordInfo<'gallery', '/gallery', Record<never, never>, Record<never, never>>,
    'goods-permit-information': RouteRecordInfo<'goods-permit-information', '/goods-permit-information', Record<never, never>, Record<never, never>>,
    'home': RouteRecordInfo<'home', '/home', Record<never, never>, Record<never, never>>,
    'inspection': RouteRecordInfo<'inspection', '/inspection', Record<never, never>, Record<never, never>>,
    'login': RouteRecordInfo<'login', '/login', Record<never, never>, Record<never, never>>,
    'management': RouteRecordInfo<'management', '/management', Record<never, never>, Record<never, never>>,
    'member-activity': RouteRecordInfo<'member-activity', '/member-activity', Record<never, never>, Record<never, never>>,
    'members': RouteRecordInfo<'members', '/members', Record<never, never>, Record<never, never>>,
    'occupant-activity': RouteRecordInfo<'occupant-activity', '/occupant-activity', Record<never, never>, Record<never, never>>,
    'occupants': RouteRecordInfo<'occupants', '/occupants', Record<never, never>, Record<never, never>>,
    'reservation': RouteRecordInfo<'reservation', '/reservation', Record<never, never>, Record<never, never>>,
    'role': RouteRecordInfo<'role', '/role', Record<never, never>, Record<never, never>>,
    'statistics': RouteRecordInfo<'statistics', '/statistics', Record<never, never>, Record<never, never>>,
    'unit': RouteRecordInfo<'unit', '/unit', Record<never, never>, Record<never, never>>,
    'units': RouteRecordInfo<'units', '/units', Record<never, never>, Record<never, never>>,
    'work-orders': RouteRecordInfo<'work-orders', '/work-orders', Record<never, never>, Record<never, never>>,
    'work-permits-information': RouteRecordInfo<'work-permits-information', '/work-permits-information', Record<never, never>, Record<never, never>>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
