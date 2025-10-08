import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme";
import { styles } from "./styles";

export default function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
      </View>
    </LinearGradient>
  );
}