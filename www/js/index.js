"use strict"
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


/****** PAGES *******/

var _page = _page || {};

_page.Tabs = [
              {id: 0, name: "Schedule", active: true},
              {id: 1, name: "Standings", active: false}
];
_page.btnStandings = document.getElementById('btnStanding') || undefined;
_page.btnSchedule = document.getElementById('btnSchedule') || undefined;
_page.btnrefresh = document.getElementById('btnRefresh') || undefined;

_page.changeTab = function (tab) {
  // Reset tabs
  // I'm not letting you break it that easily
  if (tab == 0 || tab == 1) {
      for (var i = 0; i < _page.Tabs.length; i++) {
    _page.Tabs[i].active = false;
  }
  _page.Tabs[tab].active = true;
  _page.draw(); 
  }
};

_page.createSchedule = function () {
  var Schedule = _data.Schedule || _data.getSchedule();
  var container = document.getElementById('content');
  container.innerHTML = "";
  for (var i = 0; i < Schedule.length; i++) {
    // Tables
    var table = document.createElement('table');
    table.classList.add('schedule');
    
    // Head
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.textContent = Schedule[i].date;
    
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);

    // Body
    var tbody = document.createElement('tbody');
    var game1 = document.createElement('tr');
    var game2 = document.createElement('tr');
    var vs = document.createElement('td');
    vs.textContent = "VS";
    
    
    var team1 = document.createElement('td');
    team1.textContent = Schedule[i].teams[0];
    var team2 = document.createElement('td');
    team2.textContent = Schedule[i].teams[1];
    
    game1.appendChild(team1);
    game1.appendChild(vs);
    game1.appendChild(team2);
    
    var team3 = document.createElement('td');
    team3.textContent = Schedule[i].teams[2];
    var team4 = document.createElement('td');
    team4.textContent = Schedule[i].teams[3];
    vs = document.createElement('td');
    vs.textContent = "VS";
    
    game2.appendChild(team3);
    game2.appendChild(vs);
    game2.appendChild(team4);
    
    tbody.appendChild(game1);
    tbody.appendChild(game2);
    
    table.appendChild(tbody);
    container.appendChild(table);
  }
};

_page.createStandings = function () {
  var Standings = _data.Standings || _data.getStandings();

  var container = document.getElementById('content');
  container.innerHTML = "";
  var table = document.createElement('table');
  table.classList.add('standings');
  
  // Head
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  // Team
  var th = document.createElement('th');
  th.textContent = "Team";
  tr.appendChild(th);
  // Wins
  th = document.createElement('th');
  th.textContent = "Wins";
  tr.appendChild(th);
  // Ties
  th = document.createElement('th');
  th.textContent = "Ties";
  tr.appendChild(th);
  // Losses
  th = document.createElement('th');
  th.textContent = "Losses";
  tr.appendChild(th);
  thead.appendChild(tr);
  table.appendChild(thead);
  
  // Body
  var tbody = document.createElement('tbody');
  
  for (var i = 0; i < Standings.length; i++) {
    
    tr = document.createElement('tr');
    var td = document.createElement('td');
    // Team
    td.textContent = _teams.getName(Standings[i].id);
    tr.appendChild(td);
    // Wins
    td = document.createElement('td');
    td.textContent = Standings[i].wins;
    tr.appendChild(td);
    // Ties
    td = document.createElement('td');
    td.textContent = Standings[i].ties;
    tr.appendChild(td);
    // Losses
    td = document.createElement('td');
    td.textContent = Standings[i].losses
    tr.appendChild(td);
    
    tbody.appendChild(tr);
  }
  
  table.appendChild(tbody);
  container.appendChild(table);
  
};

_page.draw = function () {
  if (_page.Tabs[0].active) {
    // Display the Schedule
    _page.createSchedule();
  } else {
    // Display the Standings
    _page.createStandings();
  }
};

/****** TEAMS *******/

var _teams = _teams || {};

_teams.G = {id: null, name: "Gryffindor", icon: null};
_teams.R = {id: null, name: "Ravenclaw", icon: null};
_teams.H = {id: null, name: "Hufflepuff", icon: null};
_teams.S = {id: null, name: "Slytherin", icon: null};

_teams.getName = function (id) {
  if (id == _teams.G.id) {
    return _teams.G.name;
  } else if (id == _teams.R.id) {
    return _teams.R.name;
  } else if (id == _teams.H.id) {
    return _teams.H.name;
  } else if (id == _teams.S.id) {
    return _teams.S.name;
  }
};

_teams.getID = function (name) {
  if (name == _teams.G.name) {
    return _teams.G.id;
  } else if (name == _teams.R.name) {
    return _teams.R.id;
  } else if (name == _teams.H.name) {
    return _teams.H.id;
  } else if (name == _teams.S.name) {
    return _teams.S.id;
  }
};

_teams.getIcon = function (house) {
  if (typeof house === 'number') {
    if (house == _teams.G.id) {
      return _teams.G.icon;
    } else if (house == _teams.R.id) {
      return _teams.R.icon;
    } else if (house == _teams.H.id) {
      return _teams.H.icon;
    } else if (house == _teams.S.id) {
      return _teams.S.icon;
    }
  } else {
    if (house == _teams.G.name) {
      return _teams.G.icon;
    } else if (house == _teams.R.name) {
      return _teams.R.icon;
    } else if (house == _teams.H.name) {
      return _teams.H.icon;
    } else if (house == _teams.S.name) {
      return _teams.S.icon;
    }
  }
};

/****** DATA *******/

var _data = _data || {};

_data.Data = {};
_data.Scores = {};
_data.Teams = {};
_data.Schedule = undefined;
_data.Standings = undefined;

_data.getTeams = function () {
  for (var i = 0; i < _data.Teams.length; i++) {
    switch (_data.Teams[i].name) {
      case "Gryffindor":
          _teams.G.id = _data.Teams[i].id;
        break;
      case "Ravenclaw":
          _teams.R.id = _data.Teams[i].id;
        break;
        case "Hufflepuff":
          _teams.H.id = _data.Teams[i].id;
        break;
      case "Slytherin":
          _teams.S.id = _data.Teams[i].id;
        break;
    }
  }
  _page.createSchedule();
};

_data.getStandings = function () {
  var Standings = [
                  {id: _teams.G.id, wins: 0, ties: 0, losses: 0, score: 0},
                  {id: _teams.R.id, wins: 0, ties: 0, losses: 0, score: 0},
                  {id: _teams.H.id, wins: 0, ties: 0, losses: 0, score: 0},
                  {id: _teams.S.id, wins: 0, ties: 0, losses: 0, score: 0}
                  ];
  
  // Get the wins/ties/losses
  for (i = 0; i < _data.Scores.length; i++) {
    for (var j = 0; j < _data.Scores[i].games.length; j++) {
      var home = _data.Scores[i].games[j].home;
      var home_score = _data.Scores[i].games[j].home_score;
      var away = _data.Scores[i].games[j].away;
      var away_score = _data.Scores[i].games[j].away_score;
      
      
      for (var k = 0; k < Standings.length; k++) {
        if (home == Standings[k].id) {
          Standings[k].wins += home_score > away_score ? 1 : 0;
          Standings[k].ties += home_score == away_score ? 1 : 0;
          Standings[k].losses += home_score < away_score ? 1: 0;
          // Home team
        }
        
        if (away == Standings[k].id) {
         // Away team 
          Standings[k].wins += away_score > home_score ? 1 : 0;
          Standings[k].ties += away_score == home_score ? 1 : 0;
          Standings[k].losses += away_score < home_score ? 1 : 0;
        }
      }
      
      
    }
  }
  
  // Calculate score
  for (var i = 0; i < Standings.length; i++) {
    var win_multiplier = 2;
    var tie_multiplier = 1;
    var loss_multiplier = -1;
    Standings[i].score = (Standings[i].wins * win_multiplier) + (Standings[i].ties * tie_multiplier) + (Standings[i].losses * loss_multiplier);
  }
  
  
  // Sort
  Standings.sort(function (a, b) {return b.score - a.score});

  return Standings;
};

_data.getSchedule = function () {
  var Schedule = [];
  for (var i = 0; i < _data.Scores.length; i++) {
    var theGame = {date: null, teams: []};
    theGame.date = _data.Scores[i].date;
    for (var j = 0; j < _data.Scores[i].games.length; j++) {
      var home = _teams.getName(_data.Scores[i].games[j].home);
      var away = _teams.getName(_data.Scores[i].games[j].away);
      theGame.teams.push(home);
      theGame.teams.push(away);
    }
    Schedule.push(theGame);
  }
  
  return Schedule;
};

_data.fetchData = function () {
    var url = "https://griffis.edumedia.ca/mad9014/sports/quidditch.php";
    var options = {
        method: 'POST',
        body: null,
        mode: "cors"
    };

    var myRequest = new Request(
        url,
        options
    );

fetch(myRequest).then(function(response) {
  return response.json();
}).then(function(data) {
    _data.Data = data;
    _data.Scores = data.scores;
    _data.Teams = data.teams;
    _data.saveData();
    _data.getTeams();
    _data.Schedule = _data.getSchedule();
    _data.Standings = _data.getStandings();
    _page.draw();
});

};

_data.loadData = function () {
    if (localStorage.getItem('data') == null) {
        _data.fetchData();
    } else {
        var data = JSON.parse(localStorage.getItem('data'));
        _data.Data = data;
        _data.Scores = data.scores;
        _data.Teams = data.teams;
        _data.getTeams();
        _data.Schedule = _data.getSchedule();
        _data.Standings = _data.getStandings();
      _page.draw();
    }
};

_data.saveData = function () {
    if (_data.Scores) {
        localStorage.setItem('data', JSON.stringify(_data.Data));
    }
};

_data.clearData = function () {
  localStorage.removeItem('data');
};

_data.reload = function () {
  _data.clearData();
  _data.fetchData();
};


// INIT

_page.init = function () {
  // Shouldn't reach here but let's make sure they are set
  if (_page.btnSchedule == undefined) {
    _page.btnSchedule = document.getElementById('btnSchedule');
  }
  if (_page.btnStandings == undefined) {
    _page.btnStandings = document.getElementById('btnStanding');
  }
  if (_page.btnRefresh == undefined) {
    _page.btnRefresh = document.getElementById('btnRefresh');
  }
  // Setup listeners
  _page.btnSchedule.addEventListener("click", function (){_page.changeTab(0)}, false);
  _page.btnStandings.addEventListener("click", function (){_page.changeTab(1)}, false);
  _page.btnrefresh.addEventListener("click", function (){_data.reload()}, false);
  _data.loadData();
}();

document.addEventListener("deviceready", _page.init);