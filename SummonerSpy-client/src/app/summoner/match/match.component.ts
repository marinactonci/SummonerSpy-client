import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {regions, queueIdArray, summonerSpell, runes} from "../../utils/constants";
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match: any;
  @Input() summonerName: any;
  player: any;
  gameDuration: any;
  selectedRegion: any;
  sortedParticipants: any[] = [];
  blueTeam: any[] = [];
  redTeam: any[] = [];
  arenaTeams: any[][] = [[], [], [], []];
  result: string;
  gameMode: string;
  lastPlayed: string = '';
  summonerSpell: any;
  runes: any;
  items: any[6] = [];

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.gameDuration = this.convertSecondsToMinutes(this.match.gameDuration);
    this.result = this.match.isRemake ? 'Remake' : this.match.isWin ? 'Victory' : 'Defeat';
    this.summonerSpell = summonerSpell;
    this.runes = runes;
    console.log('this.match');
    console.log(this.match);
    for (let queue of queueIdArray) {
      if (queue.queueId === this.match.queueId) {
        this.gameMode = queue.description;
      }
    }
    //get time of end of game from timestamp that is saved in this.match.gameEndTimestamp
    const difference: number = Date.now() - this.match.gameEndTimestamp;
    const minutes: number = Math.floor(difference / 60000);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);
    const months: number = Math.floor(days / 30);

    if (months > 0) {
      this.lastPlayed = months > 1 ? months + ' months ago' : 'a month ago';
    } else if (days > 0) {
      this.lastPlayed = days > 1 ? days + ' days ago' : 'a day ago';
    } else if (hours > 0) {
      this.lastPlayed = hours + ' hours ago';
    } else if (minutes > 0) {
      this.lastPlayed = minutes + ' minutes ago';
    }

    for (let participant of this.match.participants) {
      if (participant.summonerName === this.summonerName) {
        this.player = participant;
        if (participant.championName.toLowerCase() === 'milio') this.player.isMilio = true;
        if (participant.championName.toLowerCase() === 'naafiri') this.player.isNaafiri = true;
        this.items = [ this.player.item0, this.player.item1, this.player.item2, this.player.item3,
          this.player.item4, this.player.item5];
        this.player.cs = this.player.totalMinionsKilled + this.player.neutralMinionsKilled;
        this.player.kda = this.player.deaths === 0 ? 'Perfect KDA' : ((this.player.kills + this.player.assists) / this.player.deaths).toFixed(2);
        this.player.cspm = (this.player.cs / (this.match.gameDuration / 60)).toFixed(1);
      }

      if (participant.championName.toLowerCase() === 'fiddlesticks') participant.championName = 'Fiddlesticks';

      if (this.match.gameMode === 'CLASSIC') {
        if (participant.teamId === 100) {
          if (participant.individualPosition === 'TOP') {
            this.sortedParticipants[0] = participant;
          } else if (participant.individualPosition === 'JUNGLE') {
            this.sortedParticipants[2] = participant;
          } else if (participant.individualPosition === 'MIDDLE') {
            this.sortedParticipants[4] = participant;
          } else if (participant.individualPosition === 'BOTTOM') {
            this.sortedParticipants[6] = participant;
          } else if (participant.individualPosition === 'UTILITY') {
            this.sortedParticipants[8] = participant;
          }
        } else if (participant.teamId === 200) {
          if (participant.individualPosition === 'TOP') {
            this.sortedParticipants[1] = participant;
          } else if (participant.individualPosition === 'JUNGLE') {
            this.sortedParticipants[3] = participant;
          } else if (participant.individualPosition === 'MIDDLE') {
            this.sortedParticipants[5] = participant;
          } else if (participant.individualPosition === 'BOTTOM') {
            this.sortedParticipants[7] = participant;
          } else if (participant.individualPosition === 'UTILITY') {
            this.sortedParticipants[9] = participant;
          }
        }
      } else if (this.match.gameMode === 'CHERRY') {
        this.arenaTeams[participant.placement - 1].push(participant);
      } else {
        if (participant.teamId === 100) {
          this.blueTeam.push(participant);
        } else this.redTeam.push(participant);
      }
    }
  }

  openSummoner(item) {
    const regionCode = this.route.snapshot.params['regionCode'];

    for (let region of regions) {
      if (region.shorthand === regionCode) {
        this.selectedRegion = region;
      }
    }

    if (item.summonerName) {
      const url: string = `summoners/${this.selectedRegion.majorRegion}/${this.selectedRegion.shorthand}/${item.summonerName}`;
      this.router.navigateByUrl(url).then(r => console.log(r));
    }
  }

  convertSecondsToMinutes(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    if (minutes < 4) this.match.isRemake = true;
    return `${minutes < 10 ? '0' + minutes: minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  }
}