/**
 * @component QuestionForm
 * @summary Form for creating and editing questions
 * @domain question
 * @type domain-component
 * @category form
 *
 * @props
 * @param {QuestionFormProps} props
 *   - question: Optional question data for editing
 *   - onSubmit: Callback when form is submitted
 *   - onCancel: Callback when cancel button is clicked
 *   - isSubmitting: Loading state for submit button
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/core/components/Button';
import { QuestionType, DifficultyLevel } from '../../types';
import type { QuestionFormProps } from './types';

const questionSchema = z.object({
  tipo_questao: z.nativeEnum(QuestionType),
  enunciado: z.string().min(10, 'Enunciado deve ter pelo menos 10 caracteres').max(1000),
  nivel_dificuldade: z.nativeEnum(DifficultyLevel),
  tema_geografico: z.string().min(1, 'Tema é obrigatório').max(200),
  valor_pontos: z.number().positive('Valor deve ser positivo').default(1.0),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export const QuestionForm = (props: QuestionFormProps) => {
  const { question, onSubmit, onCancel, isSubmitting = false } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: question
      ? {
          tipo_questao: question.tipo_questao,
          enunciado: question.enunciado,
          nivel_dificuldade: question.nivel_dificuldade,
          tema_geografico: question.tema_geografico,
          valor_pontos: question.valor_pontos,
        }
      : {
          valor_pontos: 1.0,
        },
  });

  const handleFormSubmit = (data: QuestionFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="tipo_questao" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Questão *
        </label>
        <select
          id="tipo_questao"
          {...register('tipo_questao')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o tipo</option>
          <option value={QuestionType.MultipleChoice}>Múltipla Escolha</option>
          <option value={QuestionType.TrueFalse}>Verdadeiro/Falso</option>
          <option value={QuestionType.ColumnMatching}>Associação de Colunas</option>
          <option value={QuestionType.InteractiveMap}>Mapa Interativo</option>
        </select>
        {errors.tipo_questao && (
          <p className="mt-1 text-sm text-red-600">{errors.tipo_questao.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="enunciado" className="block text-sm font-medium text-gray-700 mb-2">
          Enunciado *
        </label>
        <textarea
          id="enunciado"
          {...register('enunciado')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o enunciado da questão"
        />
        {errors.enunciado && (
          <p className="mt-1 text-sm text-red-600">{errors.enunciado.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="nivel_dificuldade" className="block text-sm font-medium text-gray-700 mb-2">
          Nível de Dificuldade *
        </label>
        <select
          id="nivel_dificuldade"
          {...register('nivel_dificuldade')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o nível</option>
          <option value={DifficultyLevel.Easy}>Fácil</option>
          <option value={DifficultyLevel.Medium}>Médio</option>
          <option value={DifficultyLevel.Hard}>Difícil</option>
        </select>
        {errors.nivel_dificuldade && (
          <p className="mt-1 text-sm text-red-600">{errors.nivel_dificuldade.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tema_geografico" className="block text-sm font-medium text-gray-700 mb-2">
          Tema Geográfico *
        </label>
        <input
          id="tema_geografico"
          type="text"
          {...register('tema_geografico')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Continentes, Países, Relevo"
        />
        {errors.tema_geografico && (
          <p className="mt-1 text-sm text-red-600">{errors.tema_geografico.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="valor_pontos" className="block text-sm font-medium text-gray-700 mb-2">
          Valor em Pontos *
        </label>
        <input
          id="valor_pontos"
          type="number"
          step="0.1"
          {...register('valor_pontos', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.valor_pontos && (
          <p className="mt-1 text-sm text-red-600">{errors.valor_pontos.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} fullWidth>
          {isSubmitting ? 'Salvando...' : question ? 'Atualizar Questão' : 'Criar Questão'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} fullWidth>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
