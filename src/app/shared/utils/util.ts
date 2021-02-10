export class Utils {
  public static decrypt(value: any): any {
    if ((value || '') === '') return null;
    try {
      return atob(value);
    } catch (err) {
      return null;
    }
  }
}
