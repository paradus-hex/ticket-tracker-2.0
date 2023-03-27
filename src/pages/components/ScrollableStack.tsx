import styled from "@emotion/styled";
import {
  darken,
  Stack,
  type StackProps,
  type StackTypeMap,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  type OverridableComponent,
  type OverridableTypeMap,
} from "@mui/material/OverridableComponent";

function createScrollableStack<TypeMap extends OverridableTypeMap>(
  component: OverridableComponent<any>
): OverridableComponent<TypeMap> {
  return styled(component)`
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.5em;
      height: 0.5em;
    }
  ` as OverridableComponent<TypeMap>;
}

const StyledStack = createScrollableStack<StackTypeMap>(Stack);

export type ScrollableStackProps = StackProps;
export function ScrollableStack({ children, ...props }: ScrollableStackProps) {
  return (
    <StyledStack
      {...props}
      gap={1}
      sx={{
        overflowX: "auto",
        ...(props.sx ?? {}),
      }}
    >
      {children}
    </StyledStack>
  );
}
