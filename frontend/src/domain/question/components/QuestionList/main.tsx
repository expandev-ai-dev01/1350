/**
 * @component QuestionList
 * @summary Displays list of questions with filter and action options
 * @domain question
 * @type domain-component
 * @category display
 *
 * @props
 * @param {QuestionListProps} props
 *   - filters: Optional filters for question list
 *   - onEdit: Callback when edit button is clicked
 *   - onDelete: Callback when delete button is clicked
 */

import { useQuestionList } from '../../hooks/useQuestionList';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';
import type { QuestionListProps } from './types';
import type { Question } from '../../types';

export const QuestionList = (props: QuestionListProps) => {
  const { filters, onEdit, onDelete } = props;

  const { data: questions, isLoading, error } = useQuestionList({ filters });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar questões: {error.message}</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhuma questão encontrada.</p>
      </div>
    );
  }

  const getQuestionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      multipla_escolha: 'Múltipla Escolha',
      verdadeiro_falso: 'Verdadeiro/Falso',
      associacao_colunas: 'Associação de Colunas',
      mapa_interativo: 'Mapa Interativo',
    };
    return labels[type] || type;
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels: Record<string, string> = {
      facil: 'Fácil',
      medio: 'Médio',
      dificil: 'Difícil',
    };
    return labels[difficulty] || difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      facil: 'bg-green-100 text-green-800',
      medio: 'bg-yellow-100 text-yellow-800',
      dificil: 'bg-red-100 text-red-800',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      {questions.map((question: Question) => (
        <div
          key={question.id_questao}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {getQuestionTypeLabel(question.tipo_questao)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    question.nivel_dificuldade
                  )}`}
                >
                  {getDifficultyLabel(question.nivel_dificuldade)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.enunciado}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Tema: {question.tema_geografico}</span>
                <span>Pontos: {question.valor_pontos}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <Button size="sm" variant="secondary" onClick={() => onEdit(question)}>
                  Editar
                </Button>
              )}
              {onDelete && (
                <Button size="sm" variant="danger" onClick={() => onDelete(question.id_questao)}>
                  Excluir
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
