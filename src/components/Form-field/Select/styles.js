import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;

  //#region common styles
  .p-dropdown,
  .p-autocomplete {
    width: 100%;
    min-height: 4.4rem;
    background-color: rgba(22, 24, 35, 0.06);
    border: 1px solid ${(props) => (props.isError ? 'rgb(255, 76, 58)' : 'rgba(22, 24, 35, 0.12)')};
    border-radius: 6px;

    &:not(.p-disabled).p-focus {
      box-shadow: none;
      border-color: ${(props) => (props.isError ? 'rgb(255, 76, 58)' : 'rgba(22, 24, 35, 0.12)')};
    }

    &:not(.p-disabled):hover {
      border-color: ${(props) => (props.isError ? 'rgb(255, 76, 58)' : 'rgba(22, 24, 35, 0.12)')};
    }

    .p-dropdown-label {
      font-family: 'ProximaPro', sans-serif;
      font-size: 1.4rem;
      font-weight: 500;
      color: rgba(137, 149, 167, 1);
      line-height: 100%;

      display: inline-flex;
      align-items: center;
    }

    &-panel {
      z-index: 10000 !important;
    }
  }
  //#endregion

  //#region dropdown
  .p-dropdown-panel {
    input,
    .p-dropdown-empty-message {
      font-size: 1.2rem;
    }

    .p-dropdown-item.p-highlight {
      color: rgba(22, 24, 35, 1);
      background: transparent;
    }
  }
  //#endregion

  //#region autocompleted
  .p-autocomplete .p-inputtext {
    font-size: 1.4rem;
    flex: 0.85;
    background-color: transparent;
    border: none;

    &:enabled:hover,
    &:enabled:focus {
      border-color: rgba(22, 24, 35, 0.12);
      box-shadow: none;
    }
  }

  .p-autocomplete .p-button {
    flex: 0.15;
    background: transparent;
    color: rgba(137, 149, 167, 1);
    border: none;

    &:enabled:hover,
    &:enabled:active {
      border-color: rgba(22, 24, 35, 0.12);
    }
  }
  //#endregion
`;
