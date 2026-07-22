import { ScrollView, type ScrollViewProps, type StyleProp, type ViewStyle } from "react-native";
export interface ScrollAreaProps extends ScrollViewProps { style?: StyleProp<ViewStyle>; }
export function ScrollArea({ children, style, ...props }: ScrollAreaProps) { return <ScrollView style={style} {...props}>{children}</ScrollView>; }
