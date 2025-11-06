import { useSQLiteContext } from "expo-sqlite";

export type TargetCreate = {
  name: string;
  amount: number;
}

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
}

export function useTargetDatabase() {
  const database = useSQLiteContext();

  async function create(data: TargetCreate) {
    const statement = await database.prepareAsync("INSERT INTO targets (name, amount) VALUES ($name, $amount)");

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount
    });
  }

  async function listBySavedValue() {
    return database.getAllAsync<TargetResponse>(`
      SELECT
        t.id,
        t.name,
        t.amount
      FROM targets t
    `);
  }

  return {
    create,
    listBySavedValue
  }
}