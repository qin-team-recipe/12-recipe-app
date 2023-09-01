export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      CartList: {
        Row: {
          created_at: string;
          display_order: number;
          id: number;
          recipe_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          display_order?: number;
          id?: number;
          recipe_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          display_order?: number;
          id?: number;
          recipe_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "CartList_recipe_id_fkey";
            columns: ["recipe_id"];
            referencedRelation: "Recipe";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "CartList_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      CartListItem: {
        Row: {
          cart_list_id: number;
          created_at: string;
          id: number;
          ingredient_id: number | null;
          is_completed: boolean;
          is_custom: boolean;
          order: number;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          cart_list_id: number;
          created_at?: string;
          id?: number;
          ingredient_id?: number | null;
          is_completed?: boolean;
          is_custom?: boolean;
          order: number;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          cart_list_id?: number;
          created_at?: string;
          id?: number;
          ingredient_id?: number | null;
          is_completed?: boolean;
          is_custom?: boolean;
          order?: number;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "CartListItem_cart_list_id_fkey";
            columns: ["cart_list_id"];
            referencedRelation: "CartList";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "CartListItem_ingredient_id_fkey";
            columns: ["ingredient_id"];
            referencedRelation: "Ingredient";
            referencedColumns: ["id"];
          }
        ];
      };
      DraftIngredient: {
        Row: {
          created_at: string;
          draft_recipe_id: string;
          id: number;
          is_custom: boolean;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          draft_recipe_id: string;
          id?: number;
          is_custom?: boolean;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          draft_recipe_id?: string;
          id?: number;
          is_custom?: boolean;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "DraftIngredient_draft_recipe_id_fkey";
            columns: ["draft_recipe_id"];
            referencedRelation: "DraftRecipe";
            referencedColumns: ["id"];
          }
        ];
      };
      DraftInstruction: {
        Row: {
          created_at: string;
          draft_recipe_id: string;
          id: number;
          step_description: Json;
          step_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          draft_recipe_id: string;
          id?: number;
          step_description: Json;
          step_order: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          draft_recipe_id?: string;
          id?: number;
          step_description?: Json;
          step_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "DraftInstruction_draft_recipe_id_fkey";
            columns: ["draft_recipe_id"];
            referencedRelation: "DraftRecipe";
            referencedColumns: ["id"];
          }
        ];
      };
      DraftRecipe: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          serving_count: number | null;
          title: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id: string;
          serving_count?: number | null;
          title?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          serving_count?: number | null;
          title?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "DraftRecipe_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      DraftRecipeImage: {
        Row: {
          created_at: string;
          draft_recipe_id: string;
          id: string;
          recipe_image: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          draft_recipe_id: string;
          id: string;
          recipe_image: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          draft_recipe_id?: string;
          id?: string;
          recipe_image?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "DraftRecipeImage_draft_recipe_id_fkey";
            columns: ["draft_recipe_id"];
            referencedRelation: "DraftRecipe";
            referencedColumns: ["id"];
          }
        ];
      };
      DraftRecipeLink: {
        Row: {
          created_at: string;
          draft_recipe_id: string;
          id: string;
          link_url: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          draft_recipe_id: string;
          id: string;
          link_url: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          draft_recipe_id?: string;
          id?: string;
          link_url?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "DraftRecipeLink_draft_recipe_id_fkey";
            columns: ["draft_recipe_id"];
            referencedRelation: "DraftRecipe";
            referencedColumns: ["id"];
          }
        ];
      };
      Favorite: {
        Row: {
          created_at: string;
          id: number;
          recipe_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          recipe_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          recipe_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Favorite_recipe_id_fkey";
            columns: ["recipe_id"];
            referencedRelation: "Recipe";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Favorite_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Ingredient: {
        Row: {
          created_at: string;
          id: number;
          recipe_id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          recipe_id: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          recipe_id?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Ingredient_recipe_id_fkey";
            columns: ["recipe_id"];
            referencedRelation: "Recipe";
            referencedColumns: ["id"];
          }
        ];
      };
      Instruction: {
        Row: {
          created_at: string;
          id: number;
          recipe_id: string;
          step_description: Json;
          step_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          recipe_id: string;
          step_description: Json;
          step_order: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          recipe_id?: string;
          step_description?: Json;
          step_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Instruction_recipe_id_fkey";
            columns: ["recipe_id"];
            referencedRelation: "Recipe";
            referencedColumns: ["id"];
          }
        ];
      };
      Memo: {
        Row: {
          created_at: string;
          id: number;
          isCompleted: boolean;
          order: number;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          isCompleted?: boolean;
          order: number;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          isCompleted?: boolean;
          order?: number;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Memo_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Recipe: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          is_published: boolean;
          serving_count: number;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id: string;
          is_published?: boolean;
          serving_count: number;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          is_published?: boolean;
          serving_count?: number;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Recipe_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      RecipeImage: {
        Row: {
          created_at: string;
          id: string;
          recipe_id: string;
          recipe_image: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          recipe_id: string;
          recipe_image: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          recipe_id?: string;
          recipe_image?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "RecipeImage_recipe_id_fkey";
            columns: ["recipe_id"];
            referencedRelation: "Recipe";
            referencedColumns: ["id"];
          }
        ];
      };
      RecipeLink: {
        Row: {
          created_at: string;
          id: string;
          link_url: string;
          recipe_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          link_url: string;
          recipe_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          link_url?: string;
          recipe_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "RecipeLink_recipe_id_fkey";
            columns: ["recipe_id"];
            referencedRelation: "Recipe";
            referencedColumns: ["id"];
          }
        ];
      };
      User: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          profile: string | null;
          profileImage: string | null;
          role: Database["public"]["Enums"]["RoleType"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          name: string;
          profile?: string | null;
          profileImage?: string | null;
          role?: Database["public"]["Enums"]["RoleType"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          profile?: string | null;
          profileImage?: string | null;
          role?: Database["public"]["Enums"]["RoleType"];
          updated_at?: string;
        };
        Relationships: [];
      };
      UserFollower: {
        Row: {
          created_at: string;
          followed_id: string;
          follower_id: string;
          id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          followed_id: string;
          follower_id: string;
          id?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          followed_id?: string;
          follower_id?: string;
          id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "UserFollower_followed_id_fkey";
            columns: ["followed_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "UserFollower_follower_id_fkey";
            columns: ["follower_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      UserLink: {
        Row: {
          created_at: string;
          id: number;
          updated_at: string;
          url: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          updated_at?: string;
          url: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          updated_at?: string;
          url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "UserLink_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      RoleType: "ADMIN" | "USER" | "CHEF";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
