function getMinWidth() {
    const innerWidth = window.innerWidth;
    return innerWidth>=400 ? 400 : innerWidth;
}

const STYLE = {
    MIN_WIDTH: `${getMinWidth()}px`,
    MUSIC_ROW_HEIGHT: "100px"
}

const COLOR = {
    PRIMARY_BLACK: "#242424",
    SECONDARY_BLACK: "#3D3D3D",
    PRIMARY_GOLD: "#FF9F09",
    COMPONENT_RED: "#FE453A",
    COMPONENT_GREEN: "#288540"
}
export {STYLE, COLOR}