import { useSteamInventory } from '../hooks/useSteamInventory';
import { useEffect } from 'react';

export default function SteamInventoryPage() {
  const { inventory, loading, fetchInventory } = useSteamInventory();

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventário Steam</h2>
      {loading && <p>Carregando...</p>}
      {inventory && inventory.assets && (
        <ul>
          {inventory.assets.map((item: any) => (
            <li key={item.assetid}>
              Asset ID: {item.assetid} | Class ID: {item.classid}
            </li>
          ))}
        </ul>
      )}
      {!loading && !inventory && <p>Nenhum item encontrado.</p>}
    </div>
  );
} 