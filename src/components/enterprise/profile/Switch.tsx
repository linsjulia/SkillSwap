import { Colors } from '@/constants/Colors';
import { Switch as NativeSwitch,  } from 'react-native';

function Switch({
  ...props
}: React.ComponentPropsWithoutRef<typeof NativeSwitch>) {

  
  return (
    <NativeSwitch
      trackColor={{
                true:"green",
                  false:"gray"
      }}
      thumbColor={"green"}
      {...props}
    />
  );
}

export { Switch };
