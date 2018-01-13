export class FormButton {
  public color: string;
  public type: string;
  public action: () => Promise<any>;
  public title: string;
  public outline: boolean;
  public closeModalAfterAction: boolean;
  public redirectPath: string;

  constructor(color: string, type: string, action: () => Promise<any>, title: string,
              outline = false, redirectPath = '/', closeModalAfterAction = true) {
    this.color = color;
    this.type = type;
    this.action = action;
    this.title = title;
    this.outline = outline;
    this.closeModalAfterAction = closeModalAfterAction;
    this.redirectPath = redirectPath;
  }

}
