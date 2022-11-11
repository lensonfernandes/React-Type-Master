import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before{
    box-sizing: border-box;
}

body{
    background:grey;
    padding:0;
    margin: 0;
    color: white;
    transition: all 0.25s linear;
}

.canvas{
        display: grid;
        grid-auto-flow: row;
        grid-template-row: auto 1fr auto;
        min-height: 100vh;
        gap:0.5rem;
        padding: 1rem;
        width: 100vw;
        align-items: center;
}

`;