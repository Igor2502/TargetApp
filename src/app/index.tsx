import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";
import { router } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: fontFamily.bold, fontSize: 34 }}>Olá</Text>

      <Button
        title="Nova Meta"
        onPress={() => router.navigate('/target')}
      />
      <Button
        title="Transação"
        onPress={() => router.navigate('/transaction/132')}
      />
      <Button
        title="Progresso"
        onPress={() => router.navigate('/in-progress/12')}
      />
    </View>
  )
}