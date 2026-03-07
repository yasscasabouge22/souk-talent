import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function AdminContenu() {
  const categories = [
    { id: 1, name: "DJ", count: 142 },
    { id: 2, name: "Orchestre", count: 89 },
    { id: 3, name: "Chanteur", count: 76 },
    { id: 4, name: "Groupe Traditionnel", count: 45 },
    { id: 5, name: "Groupe Moderne", count: 34 },
    { id: 6, name: "Animateur", count: 19 },
  ];

  const villes = [
    { id: 1, name: "Casablanca", count: 142 },
    { id: 2, name: "Rabat", count: 89 },
    { id: 3, name: "Marrakech", count: 76 },
    { id: 4, name: "Tanger", count: 45 },
    { id: 5, name: "Fès", count: 34 },
  ];

  const eventTypes = [
    { id: 1, name: "Mariage", count: 234 },
    { id: 2, name: "Événement corporatif", count: 156 },
    { id: 3, name: "Festival", count: 98 },
    { id: 4, name: "Soirée privée", count: 87 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contenu & Catégories</h1>
        <p className="text-gray-500 mt-1">Gérer les catégories, villes et types d'événements</p>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Catégories artistes</TabsTrigger>
          <TabsTrigger value="villes">Villes</TabsTrigger>
          <TabsTrigger value="events">Types d'événements</TabsTrigger>
          <TabsTrigger value="cms">Pages CMS</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Catégories d'artistes</CardTitle>
                <CardDescription>Gérer les catégories disponibles</CardDescription>
              </div>
              <Button className="gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Artistes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium text-gray-900">{cat.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-gray-100">
                          {cat.count}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="villes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Villes</CardTitle>
                <CardDescription>Gérer les villes disponibles</CardDescription>
              </div>
              <Button className="gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Artistes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {villes.map((ville) => (
                    <TableRow key={ville.id}>
                      <TableCell className="font-medium text-gray-900">{ville.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-gray-100">
                          {ville.count}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Types d'événements</CardTitle>
                <CardDescription>Gérer les types d'événements</CardDescription>
              </div>
              <Button className="gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Demandes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium text-gray-900">{type.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-gray-100">
                          {type.count}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cms">
          <Card>
            <CardHeader>
              <CardTitle>Pages CMS</CardTitle>
              <CardDescription>Gérer le contenu des pages statiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["FAQ", "CGU", "Politique de confidentialité", "À propos"].map((page) => (
                <div key={page} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium text-gray-900">{page}</span>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
