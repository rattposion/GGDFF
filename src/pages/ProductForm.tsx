import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useCategories } from '../hooks/useCategories';
import { ToastNotification } from '../components/UI/ToastNotification';
import { motion } from 'framer-motion';

const tipoCampos = {
  skin: [
    { name: 'print', label: 'Link/Print da Skin', type: 'text', placeholder: 'URL da print ou link da skin' },
    { name: 'steamIntegration', label: 'Integração Steam', type: 'checkbox' },
  ],
  conta: [
    { name: 'userpass', label: 'Usuário/Senha', type: 'text', placeholder: 'Login e senha' },
    { name: 'email', label: 'E-mail', type: 'text', placeholder: 'E-mail vinculado' },
    { name: 'garantia', label: 'Garantia', type: 'text', placeholder: 'Ex: 7 dias' },
    { name: 'info', label: 'Informações adicionais', type: 'textarea', placeholder: 'Detalhes extras' },
  ],
  key: [
    { name: 'key', label: 'Key/Código', type: 'text', placeholder: 'Insira a key ou código' },
    { name: 'estoque', label: 'Estoque de keys', type: 'number', placeholder: 'Quantidade' },
  ],
  servico: [
    { name: 'prazo', label: 'Prazo de entrega', type: 'text', placeholder: 'Ex: 24h' },
    { name: 'descricaoServico', label: 'Descrição do serviço', type: 'textarea', placeholder: 'Detalhes do serviço' },
  ],
  assinatura: [
    { name: 'plano', label: 'Plano', type: 'text', placeholder: 'Ex: 1 mês, Lifetime' },
    { name: 'autoRenovacao', label: 'Auto-renovação', type: 'checkbox' },
    { name: 'descricaoAssinatura', label: 'Descrição da entrega', type: 'textarea', placeholder: 'O que o usuário recebe' },
  ],
};

export default function ProductFormPage() {
  const { categories, loading: loadingCategories } = useCategories();
  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    subcategoryId: '',
    type: '',
    price: '',
    stock: '',
    status: 'active',
    featured: false,
    images: [],
    variations: [],
    subscriptionPlans: [],
    deliveryType: 'manual',
    deliveryText: '',
    deliveryFile: null,
    deliveryLink: '',
    // Campos dinâmicos
    print: '', steamIntegration: false, userpass: '', email: '', garantia: '', info: '', key: '', estoque: '', prazo: '', descricaoServico: '', plano: '', autoRenovacao: false, descricaoAssinatura: '',
  });
  const [subcategories, setSubcategories] = useState([]);
  const [variation, setVariation] = useState({ name: '', price: '', description: '', stock: '', deliveryType: 'manual', deliveryText: '', deliveryFile: null, deliveryLink: '' });
  const [plan, setPlan] = useState({ name: '', duration: '', price: '', autoRenew: false });
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    if (form.categoryId && categories) {
      const cat = categories.find((c: any) => c.id === form.categoryId);
      setSubcategories(cat?.subcategories || []);
      setForm(f => ({ ...f, type: cat?.slug || '' }));
    } else {
      setSubcategories([]);
      setForm(f => ({ ...f, type: '' }));
    }
  }, [form.categoryId, categories]);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') setForm(f => ({ ...f, [name]: checked }));
    else if (type === 'file') setForm(f => ({ ...f, images: files }));
    else setForm(f => ({ ...f, [name]: value }));
  };

  const handleAddVariation = () => {
    setForm(f => ({ ...f, variations: [...f.variations, { ...variation }] }));
    setVariation({ name: '', price: '', description: '', stock: '', deliveryType: 'manual', deliveryText: '', deliveryFile: null, deliveryLink: '' });
  };

  const handleAddPlan = () => {
    setForm(f => ({ ...f, subscriptionPlans: [...f.subscriptionPlans, { ...plan }] }));
    setPlan({ name: '', duration: '', price: '', autoRenew: false });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUploading(true);
    try {
      // Upload de imagens (mock)
      let imageUrls = [];
      if (form.images && form.images.length > 0) {
        imageUrls = Array.from(form.images).map((f: any) => URL.createObjectURL(f));
      }
      const payload = {
        ...form,
        images: imageUrls,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        variations: form.variations,
        subscriptionPlans: form.subscriptionPlans,
      };
      await api.post('/products', payload);
      setToast({ type: 'success', message: 'Produto cadastrado com sucesso!' });
      setForm({
        title: '', description: '', categoryId: '', subcategoryId: '', type: '', price: '', stock: '', status: 'active', featured: false, images: [], variations: [], subscriptionPlans: [], deliveryType: 'manual', deliveryText: '', deliveryFile: null, deliveryLink: '', print: '', steamIntegration: false, userpass: '', email: '', garantia: '', info: '', key: '', estoque: '', prazo: '', descricaoServico: '', plano: '', autoRenovacao: false, descricaoAssinatura: '',
      });
    } catch (err) {
      setToast({ type: 'error', message: 'Erro ao cadastrar produto.' });
    } finally {
      setUploading(false);
    }
  };

  // Determina campos dinâmicos por tipo
  const camposDinamicos = tipoCampos[form.type as keyof typeof tipoCampos] || [];

  return (
    <section className="py-12 min-h-[80vh] bg-dark-950">
      <div className="max-w-2xl mx-auto bg-dark-900 rounded-xl shadow-xl p-8 border border-dark-700">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary-400" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Cadastrar/Editar Produto
        </motion.h2>
        {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full p-2 rounded bg-zinc-800 text-white" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="w-full p-2 rounded bg-zinc-800 text-white" required />
          <div className="flex gap-2">
            <select name="categoryId" value={form.categoryId} onChange={handleChange} className="p-2 rounded bg-zinc-800 text-white" required>
              <option value="">Categoria</option>
              {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select name="subcategoryId" value={form.subcategoryId} onChange={handleChange} className="p-2 rounded bg-zinc-800 text-white" required>
              <option value="">Subcategoria</option>
              {subcategories?.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          {/* Campos dinâmicos por tipo de produto */}
          {camposDinamicos.length > 0 && (
            <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              {camposDinamicos.map((campo, i) => (
                <div key={campo.name} className="flex flex-col">
                  <label className="text-xs text-dark-300 mb-1">{campo.label}</label>
                  {campo.type === 'checkbox' ? (
                    <input type="checkbox" name={campo.name} checked={form[campo.name]} onChange={handleChange} />
                  ) : campo.type === 'textarea' ? (
                    <textarea name={campo.name} value={form[campo.name]} onChange={handleChange} placeholder={campo.placeholder} className="p-2 rounded bg-zinc-900 text-white" />
                  ) : (
                    <input type={campo.type} name={campo.name} value={form[campo.name]} onChange={handleChange} placeholder={campo.placeholder} className="p-2 rounded bg-zinc-900 text-white" />
                  )}
                </div>
              ))}
            </div>
          )}
          <input name="price" value={form.price} onChange={handleChange} placeholder="Preço" type="number" min="0" step="0.01" className="w-full p-2 rounded bg-zinc-800 text-white" required />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Estoque" type="number" min="0" className="w-full p-2 rounded bg-zinc-800 text-white" required />
          <div className="flex items-center gap-2">
            <label>Status:</label>
            <select name="status" value={form.status} onChange={handleChange} className="p-2 rounded bg-zinc-800 text-white">
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="blocked">Bloqueado</option>
            </select>
            <label className="ml-4 flex items-center gap-1">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Destaque
            </label>
          </div>
          <div>
            <label>Imagens/Provas:</label>
            <input type="file" name="images" multiple onChange={handleChange} className="block mt-1" />
          </div>
          {/* Variações */}
          <div className="bg-zinc-900 p-3 rounded">
            <h4 className="font-semibold mb-2">Variações</h4>
            <div className="flex gap-2 mb-2 flex-wrap">
              <input placeholder="Nome" value={variation.name} onChange={e => setVariation(v => ({ ...v, name: e.target.value }))} className="p-1 rounded bg-zinc-800 text-white" />
              <input placeholder="Preço" type="number" value={variation.price} onChange={e => setVariation(v => ({ ...v, price: e.target.value }))} className="p-1 rounded bg-zinc-800 text-white" />
              <input placeholder="Estoque" type="number" value={variation.stock} onChange={e => setVariation(v => ({ ...v, stock: e.target.value }))} className="p-1 rounded bg-zinc-800 text-white" />
              <input placeholder="Descrição" value={variation.description} onChange={e => setVariation(v => ({ ...v, description: e.target.value }))} className="p-1 rounded bg-zinc-800 text-white" />
              <button type="button" onClick={handleAddVariation} className="bg-blue-700 px-2 rounded text-white">Adicionar</button>
            </div>
            <ul className="space-y-1">
              {form.variations.map((v: any, i: number) => <li key={i} className="text-sm">{v.name} - R$ {v.price} ({v.stock} un) - {v.description}</li>)}
            </ul>
          </div>
          {/* Planos de Assinatura */}
          <div className="bg-zinc-900 p-3 rounded">
            <h4 className="font-semibold mb-2">Planos de Assinatura</h4>
            <div className="flex gap-2 mb-2 flex-wrap">
              <input placeholder="Nome" value={plan.name} onChange={e => setPlan(p => ({ ...p, name: e.target.value }))} className="p-1 rounded bg-zinc-800 text-white" />
              <input placeholder="Duração (ex: 1 mês)" value={plan.duration} onChange={e => setPlan(p => ({ ...p, duration: e.target.value }))} className="p-1 rounded bg-zinc-800 text-white" />
              <input placeholder="Preço" type="number" value={plan.price} onChange={e => setPlan(p => ({ ...p, price: e.target.value }))} className="p-1 rounded bg-zinc-800 text-white" />
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={plan.autoRenew} onChange={e => setPlan(p => ({ ...p, autoRenew: e.target.checked }))} /> Auto-renovação
              </label>
              <button type="button" onClick={handleAddPlan} className="bg-blue-700 px-2 rounded text-white">Adicionar</button>
            </div>
            <ul className="space-y-1">
              {form.subscriptionPlans.map((p: any, i: number) => <li key={i} className="text-sm">{p.name} - {p.duration} - R$ {p.price} {p.autoRenew ? '(Auto)' : ''}</li>)}
            </ul>
          </div>
          {/* Entrega Automática */}
          <div className="bg-zinc-900 p-3 rounded">
            <h4 className="font-semibold mb-2">Entrega Automática</h4>
            <select name="deliveryType" value={form.deliveryType} onChange={handleChange} className="p-2 rounded bg-zinc-800 text-white">
              <option value="manual">Manual</option>
              <option value="text">Texto</option>
              <option value="file">Arquivo</option>
              <option value="link">Link</option>
            </select>
            {form.deliveryType === 'text' && (
              <textarea name="deliveryText" value={form.deliveryText} onChange={handleChange} placeholder="Conteúdo da entrega automática" className="w-full p-2 rounded bg-zinc-800 text-white mt-2" />
            )}
            {form.deliveryType === 'file' && (
              <input type="file" name="deliveryFile" onChange={handleChange} className="block mt-2" />
            )}
            {form.deliveryType === 'link' && (
              <input name="deliveryLink" value={form.deliveryLink} onChange={handleChange} placeholder="URL de entrega" className="w-full p-2 rounded bg-zinc-800 text-white mt-2" />
            )}
          </div>
          <button type="submit" className="bg-green-700 px-6 py-2 rounded text-white w-full font-bold text-lg shadow-lg hover:bg-green-600 transition" disabled={uploading}>{uploading ? 'Salvando...' : 'Salvar Produto'}</button>
        </form>
      </div>
    </section>
  );
} 