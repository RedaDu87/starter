export class Hadith {
  id!: number;
  title!: string;
  hadeeth!: string;
  attribution!: string;
  grade!: string;
  explanation?: string;
  hadeeth_ar!: string;
  explanation_ar?: string;
  grade_ar!: string;
  hover: boolean = false; // 🔥 Ajouté ici
}
