export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

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
      ChefLink: {
        Row: {
          chef_id: string;
          createdAt: string;
          id: number;
          updatedAt: string;
          url: string;
        };
        Insert: {
          chef_id: string;
          createdAt?: string;
          id?: number;
          updatedAt: string;
          url: string;
        };
        Update: {
          chef_id?: string;
          createdAt?: string;
          id?: number;
          updatedAt?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ChefLink_chef_id_fkey";
            columns: ["chef_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Favorite: {
        Row: {
          createdAt: string;
          id: number;
          recipe_id: number;
          updatedAt: string;
          user_id: string;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          recipe_id: number;
          updatedAt: string;
          user_id: string;
        };
        Update: {
          createdAt?: string;
          id?: number;
          recipe_id?: number;
          updatedAt?: string;
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
      Recipe: {
        Row: {
          createdAt: string;
          description: string;
          id: number;
          servingCount: number;
          title: string;
          updatedAt: string;
          user_id: string;
        };
        Insert: {
          createdAt?: string;
          description: string;
          id?: number;
          servingCount: number;
          title: string;
          updatedAt: string;
          user_id: string;
        };
        Update: {
          createdAt?: string;
          description?: string;
          id?: number;
          servingCount?: number;
          title?: string;
          updatedAt?: string;
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
      User: {
        Row: {
          createdAt: string;
          id: string;
          name: string;
          profile: string | null;
          profileImage: string | null;
          role: Database["public"]["Enums"]["RoleType"];
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          name: string;
          profile?: string | null;
          profileImage?: string | null;
          role?: Database["public"]["Enums"]["RoleType"];
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          name?: string;
          profile?: string | null;
          profileImage?: string | null;
          role?: Database["public"]["Enums"]["RoleType"];
          updatedAt?: string;
        };
        Relationships: [];
      };
      UserFollower: {
        Row: {
          createdAt: string;
          followed_id: string;
          follower_id: string;
          id: number;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          followed_id: string;
          follower_id: string;
          id?: number;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          followed_id?: string;
          follower_id?: string;
          id?: number;
          updatedAt?: string;
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
