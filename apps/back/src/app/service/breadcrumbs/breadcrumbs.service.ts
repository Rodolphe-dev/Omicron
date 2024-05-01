import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbsService {

    public numberLevel: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    public LevelOneValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public LevelTwoValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public LevelThreeValue: BehaviorSubject<string> = new BehaviorSubject<string>('');

    // Max 3 level
    public getLevel()
    {
        return this.numberLevel;
    }

    public setLevel(value : number)
    {
        //this.numberLevel = value;
        this.numberLevel.next(value);
    }

    public getLevelOneValue()
    {
        return this.LevelOneValue;
    }

    public setLevelOneValue(value : string)
    {
        //this.LevelValue = value;
        this.LevelOneValue.next(value);
    }

    public getLevelTwoValue()
    {
        return this.LevelTwoValue;
    }

    public setLevelTwoValue(value : string)
    {
        //this.LevelValue = value;
        this.LevelTwoValue.next(value);
    }

    public getLevelThreeValue()
    {
        return this.LevelThreeValue;
    }

    public setLevelThreeValue(value : string)
    {
        //this.LevelValue = value;
        this.LevelThreeValue.next(value);
    }
}
