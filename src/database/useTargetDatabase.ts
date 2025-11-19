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

export type TargetUpdate = TargetCreate & {
  id: number;
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
        ta.id,
        ta.name,
        ta.amount,
        COALESCE(SUM(tr.amount), 0) AS current,
        COALESCE((SUM(tr.amount) / ta.amount) * 100, 0) AS percentage,
        ta.created_at,
        ta.updated_at
      FROM targets ta
      LEFT JOIN transactions tr ON ta.id = tr.target_id
      GROUP BY
        ta.id,
        ta.name,
        ta.amount
      ORDER BY current DESC
    `);
  }

  function show(id: number) {
    return database.getFirstAsync<TargetResponse>(`
      SELECT
        ta.id,
        ta.name,
        ta.amount,
        COALESCE(SUM(tr.amount), 0) AS current,
        COALESCE((SUM(tr.amount) / ta.amount) * 100, 0) AS percentage,
        ta.created_at,
        ta.updated_at
      FROM targets ta
      LEFT JOIN transactions tr ON ta.id = tr.target_id
      WHERE ta.id = ${id}
    `);
  }

  async function update(data: TargetUpdate) {
    const statement = await database.prepareAsync(`
      UPDATE targets
      SET name = $name,
          amount = $amount,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $id;
    `);

    statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $amount: data.amount
    });
  }

  async function remove(id: number) {
    await database.runAsync("DELETE FROM targets WHERE id = ?", id);
  }

  return {
    create,
    listBySavedValue,
    show,
    update,
    remove
  }
}