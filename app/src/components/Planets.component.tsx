import * as React from 'react';
import * as RD from '@devexperts/remote-data-ts';
import { TPlanetShortData } from '../view-models/planets.view-model';
import { AjaxError } from 'rxjs/ajax';
import { pipe } from 'fp-ts/pipeable';

export type TPlanetsViewProps = {
    getPlanetsData: RD.RemoteData<AjaxError, TPlanetShortData[]>;
}

const renderPlanetInfo = (planetInfo: TPlanetShortData) =>
    <article key={planetInfo.name}>
        <h3>{planetInfo.name}</h3>
        <p>Population: {planetInfo.population}</p>
        <p>Terrain: {planetInfo.terrain}</p>
    </article>;


const LoadingSpinner = () => <p>Loading ...</p>;

export const PlanetsView = (props: TPlanetsViewProps) =>
    pipe(
        props.getPlanetsData,
        RD.fold(
            () => null,
            () => LoadingSpinner(),
            () => null,
            (data) => (
                <section>
                    <h1>Planets</h1>
                    {data.map(renderPlanetInfo)}
                </section>
            )
        ),
    );
