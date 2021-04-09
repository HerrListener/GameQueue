import {QueueGame} from "./queue_game";
import {CounterStrikeGame} from "./games/csgo_game";

export class QueueHandler {

    private _queueGames: Array<QueueGame>

    constructor() {
        this._queueGames = new Array<QueueGame>()
    }

    load(): void {
        this._queueGames.push(new CounterStrikeGame())
    }

    get queueGames(): Array<QueueGame> {
        return this._queueGames;
    }

    set queueGames(value: Array<QueueGame>) {
        this._queueGames = value;
    }
}
