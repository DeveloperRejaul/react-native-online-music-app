import { requireNativeComponent } from 'react-native';

// create custom native view
const MYTextView = requireNativeComponent('UniqueCustomTextViewwqerqwreqwfsad');


export default (props: {text: string, textSize: number}) => {
  return <MYTextView {...props} />;
};
