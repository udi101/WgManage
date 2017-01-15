import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ICustomAttribute } from './../workgroups/customAttributes/customAttribute.interface'
import { IProcess } from './../interfaces/process.interface';
import { IStrParameter } from './../interfaces/strParameter.interface';
import { IUser } from './../interfaces/user.internface';
import { IWorkgroup } from './../workgroups/workgroup.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/do';
import 'rxjs/add/Operator/catch';

@Injectable()
export class WorkgroupService {
  currentWorkgroup: string = '';
  currentAcg: string = '';

// === משתנים עבור ההתחברות למערכת
  userId:string = null;
  userPassword:string = null;

  private workgroupUrl: string = 'http://localhost/WebApi/api/workgroups/';
  // private workgroupUrl:string = 'http://hhw-rgininap31/WebApi/api/workgroups/';

  private processUrl: string = 'http://localhost/WebApi/api/processes/';
  // private processUrl :string = 'http://hhw-rgininap31/WebApi/api/processes/';

  private caUrl: string = 'http://localhost/WebApi/api/customAttribute/';
  //  private caUrl:string = 'http://hhw-rgininap31/WebApi/api/customAttributes/';

  private usersUrl: string = 'http://localhost/webapi/api/users/'
  // private usersUrl: string = 'http://hhw-rgininap31/webapi/api/users/'

  private acgUrl: string = 'http://localhost/WebApi/api/acg/';     //laptop
  //  private acgUrl:string = 'http://hhw-rgininap31/WebApi/api/acg/';


  constructor(private _http: Http) { }

  // === טיפול בשגיאות
  private handleError(error: Response): Observable<any> {
    console.log(error.json());
    return Observable.throw(error.json().error || 'Server Error');
  }

  // התחברות למערכת
  connect(_user:string,_password:string):Observable<string>{
    let url = this.usersUrl + "connectUser/" + _user; 
    let body = JSON.stringify({"password":_password});
    let headers:Headers = new Headers();
    headers.append('Content-Type','application/json');
    this._http.post(url,body,{headers:headers})
    .map((response:Response) => <string>response.json())
    .catch(this.handleError);
    return ;
  }


  // שליפה של כל התהליכים במערכת
  loadProcesses(): Observable<IProcess[]> {
    return this._http.get(this.processUrl)
      .map((response: Response) => <IProcess[]>response.json())
      .catch(this.handleError);
  }

  // שליפה של כל הפרמטרים של תהליך מסויים 
  loadStrParameters(_processName: string): Observable<IStrParameter[]> {
    return this._http.get(this.processUrl + _processName)
      .map((response: Response) => <IStrParameter[]>response.json())
      .catch(this.handleError);
  }

  // שליפה של משתמשים שאינם חברים בקבוצה מסויימת
  loadCandidates(_workgroup: string): Observable<IUser[]> {
    return this._http.get(this.usersUrl + 'GetCandidatesForWg/' + _workgroup)
      .map((response: Response) => <IUser[]>response.json())
      .catch(this.handleError);
  }

  // === הוספת משתמש לקבוצה
  addUserToWorkgroup(_workgroup: string, _user: IUser): Observable<any> {
    let url = this.workgroupUrl + _workgroup;
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    let body: string = JSON.stringify(_user);
    return this._http.put(url, body, { headers: headers })
      .map((respnse: Response) => <boolean>respnse.json())
      .catch(this.handleError);
  }

  // === שליפה של רשימת הקבוצות  בהן משתמש מסויים אינו חבר
  getCandidatesWgForUser(_user: string): Observable<IWorkgroup[]> {
    return this._http.get(this.workgroupUrl + 'GetCandidatesWgForUser/' + _user)
      .map((response: Response) => <IWorkgroup[]>response.json())
      .catch(this.handleError);
  }


  // acg-שליפה של רשימת ה
  getAcg(): Observable<string[]> {
    return this._http.get(this.acgUrl)
      .map((response: Response) => response.json())
      .do(data => console.log("The data is : " + JSON.stringify(data)));
  }

  // Get structure Parameters of a Workgroup
  getStructureParametersByWorkgroup(_workgroup: string): Observable<IProcess[]> {
    return this._http.get(this.workgroupUrl + 'Getstructureparameters/' + _workgroup)
      .map((res: Response) => <IProcess[]>res.json())
      .catch(this.handleError);
  }

  // Get all users of a Workgroup
  getWorkgroupsUsers(_workgroup: string): Observable<IUser[]> {
    return this._http.get(this.usersUrl + 'GetUsersByWorkgroup/' + _workgroup)
      .map((res: Response) => <IUser[]>res.json())
      .catch(this.handleError);
  }

  // קבלת רשימה של כל היוזרים של המערכת
  getUsers(): Observable<IUser[]> {
    return this._http.get(this.usersUrl)
      .map((res: Response) => <Array<IUser>>res.json())
      .catch(this.handleError);
  }

  // שליפת רשימה של כל הקבוצות שבהן חבר יוזר מסוים
  getWorkgroupsOfUser(_user: string): Observable<IWorkgroup[]> {
    return this._http.get(this.workgroupUrl + 'GetWorkgroupsOfUser/' + _user)
      .map((response: Response) => <IWorkgroup[]>response.json())
      .catch(this.handleError);
  }

  // Get workgroups by their Acg
  getWorkgroups(_acg: string): Observable<string[]> {
    return this._http.get(this.workgroupUrl + 'GetWorkgroupsByAcg/' + _acg)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // הסרה של משתמש מקבוצה
  removeUserFromworkgroup(_workgroup: string, _user: IUser): Observable<IUser[]> {
    let _url = this.usersUrl + "removeFromWorkgroup/" + _workgroup;
    let body: string = JSON.stringify(_user);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(_url, body, { headers: headers })
      .map((response: Response) => <IUser[]>response.json())
      .catch(this.handleError);
  }

  // הסרה של קבוצה מרשימת הקבוצות בהם משתמש חבר
  removeWorkgroupFromUser(_user: string, _workgroup: string): Observable<IWorkgroup[]> {
    let url = this.usersUrl + "RemoveWorkgroupFromUser/" + _user;
    let body: string = JSON.stringify(_workgroup);
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this._http.post(url, body, { headers: headers })
      .map((response: Response) => <IWorkgroup[]>response.json())
      .catch(this.handleError);
  }


  // שינוי הסטאטוס של משתמש בקבוצה
  changeUserStatus(_workgroup: string, _user: IUser): Observable<any> {
    let body: string = JSON.stringify(_user);
    let headers: Headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http.put(this.usersUrl + _workgroup, body, { headers: headers })
      .do(data => console.log("user status data: " + JSON.stringify(data)),
      error => console.log("user status error: " + error));
  }

  //  קבלת רשימת תכונות של קבוצה
  getCustomAttr(_workgroup: string): Observable<ICustomAttribute[]> {
    return this._http.get(this.caUrl + _workgroup)
      .map((_response: Response) => _response.json())
      .catch(this.handleError);
  }

  // שינוי ערך של תכונה
  updateCustomeAttribute(_customAttribute: ICustomAttribute, _workgroupName: string): Observable<any> {
    let body = JSON.stringify(_customAttribute);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this.caUrl + _workgroupName,
      body, { headers: headers }); // .map((res:Response)=> res.json());
  }

  // עדכון ערך של פרמטר מסויים בתהליך מסויים
  updateStrParameter(process: IProcess, _strParamater: IStrParameter): Observable<any> {
    let body = JSON.stringify(_strParamater);
    let url = this.processUrl + process.processId;
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(url, body, { headers: headers });
  }


}