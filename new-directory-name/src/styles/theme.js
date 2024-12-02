import { grommet } from "grommet";
import { deepMerge } from "grommet/utils";

export const theme = deepMerge(grommet, {
    global: {
        colors: {
            brand: '#fff',
        },
        font: {
            family: "Arial",
            size: "18px",
            height: "20px",
        },
    },
});
