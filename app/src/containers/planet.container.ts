import { ask, combineContext } from '@devexperts/rx-utils/dist/context.utils';
import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { planetsViewModel, TPlanetsViewModel } from '../view-models/planets.view-model';
import { PlanetsView, TPlanetsViewProps } from '../components/Planets.component';
import { runOnMount } from '../utils/react.util';
import { Sink } from '@devexperts/rx-utils/dist/sink.utils';
import * as RD from '@devexperts/remote-data-ts';


export type PlanetContainerContext = {
    planetsViewModel: TPlanetsViewModel;
};

const Container = combineContext(ask<PlanetContainerContext>(), (e) =>
    withRX<TPlanetsViewProps>(PlanetsView)(() => {
        const {
            planetsViewModel: {
                getPlanetsData$
            }
        } = e;

        return {
            props: {
                getPlanetsData: getPlanetsData$,
            },
            defaultProps: {
                getPlanetsData: RD.initial,
            },
        }

    })
);

export const PlanetsContainer = runOnMount(
    Container,
    () =>
        new Sink({
            planetsViewModel: planetsViewModel(),
        }),
);
