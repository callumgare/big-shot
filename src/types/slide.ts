export type Slide = ImageSlide | VideoSlide

export type ImageSlide = {
    type: "image",
    src: string,
}

export type VideoSlide = {
    type: "video",
    src: string,
    posterSrc?: string,
    mimeType?: string,
}
