export default class ImageLoader {
  static loadImage = src => {
    const img = new Image();
    img.src = src;
    return img;
  };
}
