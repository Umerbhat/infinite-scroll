export interface QuestionItem {
    question_id: number;
    title: string;
    creation_date: number;
    link: string;
    owner: { display_name: string};
  }