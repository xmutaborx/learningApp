import { Api } from '../service/service';

type SwapiResponse = {
    results: {
        name: string;
        rotation_period: string;
        diameter: string;
        climate: string;
        gravity: string;
        terrain: string;
        surface_water: string;
        population: number;
    }[];
}

const planetControllerInternal = () => {
    const getPlanets = () => Api.get<SwapiResponse>('https://swapi.dev/api/planets/?format=json');

    return {
        getPlanets,
    }
};

export const planetController = planetControllerInternal();