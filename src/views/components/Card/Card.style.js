import styled from "@emotion/styled"
import {CardHeader as MuiCardHeader, Card as MuiCard} from "@mui/material";

export const Card = styled(MuiCard)`
  width: 150px
`

export const CardHeader = styled(MuiCardHeader)`
    .MuiCardHeader-title {
      overflow: hidden;
      font-size: 16px;
      font-weight: bold;
    }
  
    .MuiCardHeader-content {
      min-width: 0;
    }
`
