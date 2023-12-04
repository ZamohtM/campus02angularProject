# campus02angularProject
Book management system

##########################

Entitäten:

- Mayer: User
- Knittelfelder: Rezensionen
- Neuhauser: Bibliothek
- Lunelli: Bücher

##########################

INSTALLATION

REQ:
node 20.9.0

cmd:
//schauen ob node installiert wurde

npm -v 

//in repo navigieren

cd *working folder*
npm install -g @angular/cli
npm install -g json-server
ng add angular-datatables
npm install bootstrap bootstrap-icons
npm install @ng-bootstrap/ng-bootstrap@next --force
npm install igniteui-angular
npm install uuid4
npm i --save-dev @types/uuid4
ng serve

zweites cmd:
json-server --watch db.json
