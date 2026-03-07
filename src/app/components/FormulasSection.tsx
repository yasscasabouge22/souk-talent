import { Users, Clock, Info } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface Formula {
  name: string;
  description: string;
  instruments?: string;
  musicians: number;
  duration: string;
  price: string;
}

interface FormulasSectionProps {
  formulas: Formula[];
}

export function FormulasSection({ formulas }: FormulasSectionProps) {
  return (
    <div className="space-y-6">
      {formulas.map((formula, index) => (
        <Card 
          key={index} 
          className="bg-[#191414] border border-gray-700 hover:border-[#1DB954] transition-colors"
        >
          <CardContent className="p-8">
            {/* Titre */}
            <h3 className="text-2xl font-bold text-white mb-6">{formula.name}</h3>

            {/* Détails */}
            <div className="space-y-2 mb-8">
              {formula.instruments && (
                <p className="text-base text-gray-300">
                  {formula.instruments}
                </p>
              )}
              <p className="text-base text-gray-300 leading-relaxed">
                {formula.description}
              </p>
            </div>

            {/* Stats en ligne */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <p className="text-xl font-bold text-white">{formula.musicians} musicien{formula.musicians > 1 ? 's' : ''}</p>
              </div>
              
              <div className="text-center">
                <p className="text-xl font-bold text-white">{formula.duration}</p>
              </div>
              
              <div className="text-center flex items-center gap-2">
                <p className="text-xl font-bold text-white">{formula.price}</p>
                <Info className="size-5 text-[#1DB954]" />
              </div>
            </div>

            {/* Bouton */}
            <div className="flex justify-center">
              
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}