
var data = null
data.userList[i].name
var apiData = data.userList[i].phoneNumber
items.children[i].name
items.children[i].id

data.userList.length
items[0].children.length
var localDB = items[0].children[0].id
items[0].children[0].name



for (i = 0; i < data.userList.length; i++) {
  items[0].children.push(
    {
      "name": data.userList[i].name,
      "id": data.userList[i].phoneNumber
    }
  );
};



for (i = 0; i++; i < data.userList.length) {
  this.setState({
    localDB: apiData,
  })
};
for (i = 0; i < data.userList.length; i++) {
  items.push(
    {
      "name": data.userList[i].name,
      "id": data.userList[i].phoneNumber
    }
  );
};
constructor(){
  super()
  this.state = {
    selectedItems: [],
    items: [],
  }
};

items: [
  {
    name: "成員",
    id: 0,
    children: []
  },

],




  {
    "excutionResult": "success",
    "userList": [
      {
        "workingType": "fullTime",
        "verified": false,
        "permission": " ",
        "gender": "male",
        "phoneNumber": "+886912345670",
        "jobTitle": "ironman",
        "image": " ",
        "name": "wahaYO",
        "team": "team101",
        "leaveNotes": [],
        "workAssignments": []
      },
      {
        "name": "gaga",
        "team": "team101",
        "workingType": "partTime",
        "verified": true,
        "permission": "superbad",
        "gender": "female",
        "phoneNumber": "+886912345679",
        "jobTitle": "superman",
        "image": " ",
        "leaveNotes": [],
        "workAssignments": []
      },
      {
        "workingType": "partTime",
        "verified": true,
        "permission": "root",
        "gender": "female",
        "phoneNumber": "+886910927898",
        "jobTitle": "supercoder",
        "image": " ",
        "name": "daYuan",
        "team": "team101",
        "leaveNotes": [],
        "workAssignments": []
      },
      {
        "image": " ",
        "name": "Sid",
        "team": "team101",
        "workingType": "fullTime",
        "verified": false,
        "permission": " ",
        "gender": "male",
        "phoneNumber": "+886936141311",
        "jobTitle": "ironman",
        "leaveNotes": [],
        "workAssignments": []
      },
      {
        "image": " ",
        "name": "wahaha",
        "team": "team101",
        "workingType": "fullTime",
        "verified": false,
        "permission": " ",
        "gender": "male",
        "phoneNumber": "+886912345678",
        "jobTitle": "ironman",
        "leaveNotes": [],
        "workAssignments": []
      },
      {
        "image": " ",
        "name": "Lin",
        "team": "餐廳組",
        "workingType": "fullTime",
        "verified": false,
        "permission": " ",
        "gender": "male",
        "phoneNumber": "+886908668531",
        "jobTitle": "Ssss",
        "leaveNotes": [],
        "workAssignments": []
      },
      {
        "workingType": "fullTime",
        "verified": false,
        "permission": " ",
        "gender": "male",
        "phoneNumber": "+886912545678",
        "jobTitle": "ironman",
        "image": " ",
        "name": "wahaha",
        "team": "team101",
        "leaveNotes": [],
        "workAssignments": []
      }
    ]
  }