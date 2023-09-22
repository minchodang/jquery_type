import { StyleProp, ViewProps } from "react-native/types";
interface KeyboardAwareScrollViewProps extends ViewProps {
  children: React.ReactNode;
  style: StyleProp<ViewProps>;
}

class KeyboardAwareScrollViewComponent extends React.Component<KeyboardAwareScrollViewProps> {}
export class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
