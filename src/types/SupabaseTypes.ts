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
          created_at: string | null;
          display_order: number;
          id: number;
          recipe_id: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          display_order?: number;
          id?: number;
          recipe_id: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          display_order?: number;
          id?: number;
          recipe_id?: number;
          updated_at?: string | null;
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
          created_at: string | null;
          id: number;
          ingredient_id: number;
          is_completed: boolean;
          updated_at: string | null;
        };
        Insert: {
          cart_list_id: number;
          created_at?: string | null;
          id?: number;
          ingredient_id: number;
          is_completed?: boolean;
          updated_at?: string | null;
        };
        Update: {
          cart_list_id?: number;
          created_at?: string | null;
          id?: number;
          ingredient_id?: number;
          is_completed?: boolean;
          updated_at?: string | null;
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
      Favorite: {
        Row: {
          created_at: string | null;
          id: number;
          recipe_id: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          recipe_id: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          recipe_id?: number;
          updated_at?: string | null;
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
          created_at: string | null;
          id: number;
          ingredient_name: string;
          is_custom: boolean;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          ingredient_name: string;
          is_custom?: boolean;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          ingredient_name?: string;
          is_custom?: boolean;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      Instruction: {
        Row: {
          created_at: string | null;
          id: number;
          recipe_id: number;
          step_description: string;
          step_order: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          recipe_id: number;
          step_description: string;
          step_order: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          recipe_id?: number;
          step_description?: string;
          step_order?: number;
          updated_at?: string | null;
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
          created_at: string | null;
          deleted_at: string | null;
          id: number;
          isCompleted: boolean;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          deleted_at?: string | null;
          id?: number;
          isCompleted?: boolean;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          deleted_at?: string | null;
          id?: number;
          isCompleted?: boolean;
          title?: string;
          updated_at?: string | null;
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
          created_at: string | null;
          deleted_at: string | null;
          description: string;
          id: number;
          serving_count: number;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          deleted_at?: string | null;
          description: string;
          id?: number;
          serving_count: number;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          deleted_at?: string | null;
          description?: string;
          id?: number;
          serving_count?: number;
          title?: string;
          updated_at?: string | null;
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
          created_at: string | null;
          id: string;
          recipe_id: number;
          recipe_image: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          recipe_id: number;
          recipe_image: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          recipe_id?: number;
          recipe_image?: string;
          updated_at?: string | null;
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
      RecipeIngredient: {
        Row: {
          created_at: string | null;
          id: number;
          ingredient_id: number;
          recipe_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          ingredient_id: number;
          recipe_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          ingredient_id?: number;
          recipe_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "RecipeIngredient_ingredient_id_fkey";
            columns: ["ingredient_id"];
            referencedRelation: "Ingredient";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "RecipeIngredient_recipe_id_fkey";
            columns: ["recipe_id"];
            referencedRelation: "Recipe";
            referencedColumns: ["id"];
          }
        ];
      };
      RecipeLink: {
        Row: {
          created_at: string | null;
          id: string;
          link_url: string;
          recipe_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          link_url: string;
          recipe_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          link_url?: string;
          recipe_id?: number;
          updated_at?: string | null;
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
          created_at: string | null;
          id: string;
          name: string;
          profile: string | null;
          profileImage: string | null;
          role: Database["public"]["Enums"]["RoleType"];
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          name: string;
          profile?: string | null;
          profileImage?: string | null;
          role?: Database["public"]["Enums"]["RoleType"];
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          profile?: string | null;
          profileImage?: string | null;
          role?: Database["public"]["Enums"]["RoleType"];
          updated_at?: string | null;
        };
        Relationships: [];
      };
      UserFollower: {
        Row: {
          created_at: string | null;
          followed_id: string;
          follower_id: string;
          id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          followed_id: string;
          follower_id: string;
          id?: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          followed_id?: string;
          follower_id?: string;
          id?: number;
          updated_at?: string | null;
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
          chef_id: string;
          created_at: string | null;
          id: number;
          updated_at: string | null;
          url: string;
        };
        Insert: {
          chef_id: string;
          created_at?: string | null;
          id?: number;
          updated_at?: string | null;
          url: string;
        };
        Update: {
          chef_id?: string;
          created_at?: string | null;
          id?: number;
          updated_at?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "UserLink_chef_id_fkey";
            columns: ["chef_id"];
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
