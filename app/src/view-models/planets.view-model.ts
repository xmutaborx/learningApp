import { planetController } from '../controllers/planet.controller';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as RD from '@devexperts/remote-data-ts'
import { AjaxError } from 'rxjs/ajax';

const getPlanetsData = planetController.getPlanets;

export type TPlanetShortData = {
    name: string;
    terrain: string;
    population: number;
}

export type TPlanetsViewModel = {
    getPlanetsData$: Observable<RD.RemoteData<AjaxError, TPlanetShortData[]>>;
}

export const planetsViewModel = (): TPlanetsViewModel => {

    // Simulation of business logic, just shortening the data
    const getPlanetsData$ = getPlanetsData().pipe(
        map(RD.map((items) =>
            items.results.map((item) => ({
                name: item.name,
                terrain: item.terrain,
                population: item.population,
            }))),
        )
    );

    return {
        getPlanetsData$,
    }
};