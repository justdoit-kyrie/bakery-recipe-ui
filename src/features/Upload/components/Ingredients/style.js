import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  .p-dropdown {
    width: 100%;
    min-height: 4.4rem;
    background-color: rgba(22, 24, 35, 0.06);
    border: 1px solid rgba(22, 24, 35, 0.12);

    &:not(.p-disabled).p-focus {
      box-shadow: none;
      border-color: rgba(22, 24, 35, 0.12);
    }

    &:not(.p-disabled):hover {
      border-color: rgba(22, 24, 35, 0.12);
    }

    .p-inputtext {
      caret-color: rgba(254, 44, 85, 1);
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
`;
