// Page
export const currentPage = store => store.general.page;

// Settings
export const getSettings = store => store.settings;
export const isSFXMuted = store => store.settings.muteSFX;
export const isMusicMuted = store => store.settings.muteMusic;

// Cards
export const areCardsReady = store => store.cards.ready;
export const getFactsMeta = store => store.cards.factMeta;

// Maps
export const areMapsReady = store => store.maps.ready;
export const getMapLayers = store => store.maps.layers;
export const getDefaultMapLayer = store => store.maps.layers[store.maps.defaultLayer];
export const geMapLayerOrder = store => store.maps.layerOrder;
export const getMapZones = store => store.maps.zones;