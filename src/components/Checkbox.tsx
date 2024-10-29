import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '../lib/utils';

// TODO: make controlled (optional)
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  label?: string;
  labelClasses?: string;
  checkboxClasses?: string;
}
function Checkbox({
  label,
  labelClasses,
  checkboxClasses,
  className,
  ...props
}: CheckboxProps) {
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(prev => !prev);
  };

  return (
    <View
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    >
      <TouchableOpacity onPress={toggleCheckbox}>
        <View
          className={cn(
            'w-8 h-7 border mt-1 border-gray-700 rounded bg-background flex justify-center items-center',
            {
              'bg-green-500': isChecked,
            },
            checkboxClasses
          )}
        >
          {isChecked && <Text className="text-background text-xs">✓</Text>}
        </View>
      </TouchableOpacity>
      {label && (
        <Text className={cn('text-lg color-white mt-1 ', labelClasses)}>{label}</Text>
      )}
    </View>
  );
}

export { Checkbox };
