export enum MarkerType {
  WithArticles,
  Suggestion,
  Normal,
}

export class MarkerViewModel {
  public icon: any;
  public infoWindowOpened = false;

  private static colorForType(type: MarkerType) {
    switch (type) {
      case MarkerType.Suggestion:
        return '#f8f9fa';
      case MarkerType.WithArticles:
        return '#dc3545';
      case MarkerType.Normal:
      default:
        return '#ffc107';
    }
  }

  constructor(markerType: MarkerType) {
    this.icon = {
      anchor: { x: 20, y: 40 },
      fillColor: MarkerViewModel.colorForType(markerType),
      fillOpacity: 1,
      // tslint:disable-next-line:max-line-length
      path: 'M 32.50,12.50 C 32.50,14.54 32.01,16.47 31.14,18.17 31.14,18.17 20.00,40.00 20.00,40.00\n' +
      // tslint:disable-next-line:max-line-length
      '20.00,40.00 8.77,17.99 8.72,17.90 7.94,16.27 7.50,14.43 7.50,12.50 7.50,5.60 13.10,0.00 20.00,0.00\n' +
      '26.90,0.00 32.50,5.60 32.50,12.50 Z M 27.50,12.50 C 27.50,8.36 24.14,5.00 20.00,5.00\n' +
      // tslint:disable-next-line:max-line-length
      '15.86,5.00 12.50,8.36 12.50,12.50 12.50,16.64 15.86,20.00 20.00,20.00 24.14,20.00 27.50,16.64 27.50,12.50 Z',
      strokeWeight: 2,
    };
  }

}
