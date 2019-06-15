
export class ImageHelper {
  public static getSrcFromBase64(image: string): string {
    return 'data:image/jpeg;base64,' + image;
  }
}
