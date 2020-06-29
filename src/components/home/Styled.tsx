import styled from 'styled-components'

export const IndexWrapper = styled.div`
    margin: 3em auto;
    text-align: center;
    overflow: hidden;
    span {
        font-size: 6em;
        font-family: 'Caveat',cursive;
        color: #d6d5b9;
        text-align: left;
        white-space: nowrap;
        @media(max-width: 580px) {
            font-size: 2em;
        }
    }
    .days {
        position: relative;
        left: 14em;
        z-index: 2;
        display: flex;
        flex-direction: column;
        top: 0;
        @media(max-width: 1440px) {
            left: 8em;
        }
        @media(max-width: 1280px) {
            left: 0;
        }
    }
    .june {
        position: relative;
        top: 2em;
        z-index:2;
    }
    .sea {
        height: 800px;
        max-height: 800px;
        overflow: hidden;
        z-index: -1;
        position: fixed;
        top: 0;
        width: 100%;
    }
    .collection {
        padding: 8em 0;
        span {
            border-top: 5px solid #d6d5b9;
            border-bottom: 5px solid #d6d5b9;
            font-size: 4em;
            color: #806638;
            @media(max-width: 580px) {
                font-size: 2em;
            }
        }
    }
    .sunshine {
        position: relative;
        left: -3em;
    }
`