/**
 * @page QuestionsPage
 * @summary Question bank management page
 * @domain question
 * @type management-page
 * @category question-management
 *
 * @routing
 * - Path: /questions
 * - Params: none
 * - Query: { tipo?: string, tema?: string, dificuldade?: string }
 * - Guards: Authentication required
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Filters, Question List, Create Form
 *
 * @data
 * - Sources: Question API
 * - Loading: Skeleton loading states
 * - Caching: 2 minutes stale time
 */

import { useState } from 'react';
import { QuestionList } from '@/domain/question/components/QuestionList';
import { QuestionForm } from '@/domain/question/components/QuestionForm';
import { useQuestionCreate } from '@/domain/question/hooks/useQuestionCreate';
import { useQuestionUpdate } from '@/domain/question/hooks/useQuestionUpdate';
import { useQuestionDelete } from '@/domain/question/hooks/useQuestionDelete';
import { Button } from '@/core/components/Button';
import type { Question, CreateQuestionDto, QuestionListParams } from '@/domain/question/types';

export const QuestionsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(undefined);
  const [filters, setFilters] = useState<QuestionListParams>({});

  const { create, isCreating } = useQuestionCreate();
  const { update, isUpdating } = useQuestionUpdate();
  const { deleteQuestion, isDeleting } = useQuestionDelete();

  const handleCreate = async (data: CreateQuestionDto) => {
    try {
      await create(data);
      setShowForm(false);
      alert('Questão criada com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Erro ao criar questão: ' + error.message);
      }
    }
  };

  const handleUpdate = async (data: CreateQuestionDto) => {
    if (!editingQuestion) return;

    try {
      await update(editingQuestion.id_questao, data);
      setShowForm(false);
      setEditingQuestion(undefined);
      alert('Questão atualizada com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Erro ao atualizar questão: ' + error.message);
      }
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta questão?')) return;

    try {
      await deleteQuestion(id);
      alert('Questão excluída com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Erro ao excluir questão: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingQuestion(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Banco de Questões</h2>
          <p className="text-gray-600 mt-2">Gerencie as questões de geografia para suas provas</p>
        </div>
        {!showForm && <Button onClick={() => setShowForm(true)}>Nova Questão</Button>}
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingQuestion ? 'Editar Questão' : 'Nova Questão'}
          </h3>
          <QuestionForm
            question={editingQuestion}
            onSubmit={editingQuestion ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            isSubmitting={isCreating || isUpdating}
          />
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                <select
                  value={filters.tipo || ''}
                  onChange={(e) => setFilters({ ...filters, tipo: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Todos</option>
                  <option value="multipla_escolha">Múltipla Escolha</option>
                  <option value="verdadeiro_falso">Verdadeiro/Falso</option>
                  <option value="associacao_colunas">Associação de Colunas</option>
                  <option value="mapa_interativo">Mapa Interativo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dificuldade</label>
                <select
                  value={filters.dificuldade || ''}
                  onChange={(e) => setFilters({ ...filters, dificuldade: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Todas</option>
                  <option value="facil">Fácil</option>
                  <option value="medio">Médio</option>
                  <option value="dificil">Difícil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                <input
                  type="text"
                  value={filters.tema || ''}
                  onChange={(e) => setFilters({ ...filters, tema: e.target.value })}
                  placeholder="Filtrar por tema"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <QuestionList filters={filters} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default QuestionsPage;
