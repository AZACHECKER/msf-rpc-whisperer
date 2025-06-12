export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      active_sessions: {
        Row: {
          created_at: string | null
          exploit_used: string | null
          id: string
          last_activity: string | null
          metadata: Json | null
          session_id: string
          session_type: string | null
          status: string
          target_host: string
        }
        Insert: {
          created_at?: string | null
          exploit_used?: string | null
          id?: string
          last_activity?: string | null
          metadata?: Json | null
          session_id: string
          session_type?: string | null
          status?: string
          target_host: string
        }
        Update: {
          created_at?: string | null
          exploit_used?: string | null
          id?: string
          last_activity?: string | null
          metadata?: Json | null
          session_id?: string
          session_type?: string | null
          status?: string
          target_host?: string
        }
        Relationships: []
      }
      ai_decision_logs: {
        Row: {
          action_taken: string | null
          actual_outcome: string | null
          ai_reasoning: string | null
          confidence_level: number | null
          created_at: string | null
          decision_step: string
          execution_time_ms: number | null
          expected_outcome: string | null
          id: string
          input_data: Json | null
          scan_id: string | null
          success: boolean | null
        }
        Insert: {
          action_taken?: string | null
          actual_outcome?: string | null
          ai_reasoning?: string | null
          confidence_level?: number | null
          created_at?: string | null
          decision_step: string
          execution_time_ms?: number | null
          expected_outcome?: string | null
          id?: string
          input_data?: Json | null
          scan_id?: string | null
          success?: boolean | null
        }
        Update: {
          action_taken?: string | null
          actual_outcome?: string | null
          ai_reasoning?: string | null
          confidence_level?: number | null
          created_at?: string | null
          decision_step?: string
          execution_time_ms?: number | null
          expected_outcome?: string | null
          id?: string
          input_data?: Json | null
          scan_id?: string | null
          success?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_decision_logs_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "auto_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_error_patterns: {
        Row: {
          created_at: string | null
          error_signature: string | null
          error_type: string
          id: string
          recovery_strategy: string | null
          success_rate: number | null
          usage_count: number | null
        }
        Insert: {
          created_at?: string | null
          error_signature?: string | null
          error_type: string
          id?: string
          recovery_strategy?: string | null
          success_rate?: number | null
          usage_count?: number | null
        }
        Update: {
          created_at?: string | null
          error_signature?: string | null
          error_type?: string
          id?: string
          recovery_strategy?: string | null
          success_rate?: number | null
          usage_count?: number | null
        }
        Relationships: []
      }
      ai_strategies: {
        Row: {
          average_time_ms: number | null
          conditions: Json | null
          created_at: string | null
          id: string
          strategy_name: string
          success_rate: number | null
          successful_attempts: number | null
          target_type: string | null
          total_attempts: number | null
          updated_at: string | null
        }
        Insert: {
          average_time_ms?: number | null
          conditions?: Json | null
          created_at?: string | null
          id?: string
          strategy_name: string
          success_rate?: number | null
          successful_attempts?: number | null
          target_type?: string | null
          total_attempts?: number | null
          updated_at?: string | null
        }
        Update: {
          average_time_ms?: number | null
          conditions?: Json | null
          created_at?: string | null
          id?: string
          strategy_name?: string
          success_rate?: number | null
          successful_attempts?: number | null
          target_type?: string | null
          total_attempts?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      attack_chains: {
        Row: {
          completed_steps: number
          created_at: string
          description: string | null
          estimated_duration: string | null
          id: string
          name: string
          status: string
          steps: Json | null
          success_rate: number | null
          target_network: string
          total_steps: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed_steps?: number
          created_at?: string
          description?: string | null
          estimated_duration?: string | null
          id?: string
          name: string
          status?: string
          steps?: Json | null
          success_rate?: number | null
          target_network: string
          total_steps?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed_steps?: number
          created_at?: string
          description?: string | null
          estimated_duration?: string | null
          id?: string
          name?: string
          status?: string
          steps?: Json | null
          success_rate?: number | null
          target_network?: string
          total_steps?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      attack_logs: {
        Row: {
          attack_session_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          level: string
          message: string
        }
        Insert: {
          attack_session_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          level: string
          message: string
        }
        Update: {
          attack_session_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          level?: string
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "attack_logs_attack_session_id_fkey"
            columns: ["attack_session_id"]
            isOneToOne: false
            referencedRelation: "attack_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      attack_sessions: {
        Row: {
          ai_analysis: Json | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          started_at: string | null
          status: string
          target: string
          updated_at: string | null
        }
        Insert: {
          ai_analysis?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          started_at?: string | null
          status?: string
          target: string
          updated_at?: string | null
        }
        Update: {
          ai_analysis?: Json | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          started_at?: string | null
          status?: string
          target?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      auto_scans: {
        Row: {
          ai_analysis: Json | null
          completed_at: string | null
          created_at: string | null
          current_step: string | null
          error_message: string | null
          id: string
          progress: number | null
          scan_type: string
          started_at: string | null
          status: string
          target_url: string
          total_steps: number | null
          updated_at: string | null
        }
        Insert: {
          ai_analysis?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          error_message?: string | null
          id?: string
          progress?: number | null
          scan_type?: string
          started_at?: string | null
          status?: string
          target_url: string
          total_steps?: number | null
          updated_at?: string | null
        }
        Update: {
          ai_analysis?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          error_message?: string | null
          id?: string
          progress?: number | null
          scan_type?: string
          started_at?: string | null
          status?: string
          target_url?: string
          total_steps?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      autonomous_exploits: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          exploit_module: string
          exploit_name: string
          id: string
          max_retries: number | null
          output: string | null
          priority: number | null
          retry_count: number | null
          scan_id: string | null
          session_id: string | null
          started_at: string | null
          status: string
          success: boolean | null
          target_url: string
          vulnerability_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          exploit_module: string
          exploit_name: string
          id?: string
          max_retries?: number | null
          output?: string | null
          priority?: number | null
          retry_count?: number | null
          scan_id?: string | null
          session_id?: string | null
          started_at?: string | null
          status?: string
          success?: boolean | null
          target_url: string
          vulnerability_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          exploit_module?: string
          exploit_name?: string
          id?: string
          max_retries?: number | null
          output?: string | null
          priority?: number | null
          retry_count?: number | null
          scan_id?: string | null
          session_id?: string | null
          started_at?: string | null
          status?: string
          success?: boolean | null
          target_url?: string
          vulnerability_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "autonomous_exploits_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "auto_scans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "autonomous_exploits_vulnerability_id_fkey"
            columns: ["vulnerability_id"]
            isOneToOne: false
            referencedRelation: "vulnerabilities"
            referencedColumns: ["id"]
          },
        ]
      }
      available_exploits: {
        Row: {
          commands: string[]
          created_at: string
          description: string | null
          difficulty: string
          id: string
          module: string
          name: string
          prerequisites: string[] | null
          success_rate: number | null
          target_services: string[] | null
          updated_at: string
        }
        Insert: {
          commands?: string[]
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          module: string
          name: string
          prerequisites?: string[] | null
          success_rate?: number | null
          target_services?: string[] | null
          updated_at?: string
        }
        Update: {
          commands?: string[]
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          module?: string
          name?: string
          prerequisites?: string[] | null
          success_rate?: number | null
          target_services?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      bot_data: {
        Row: {
          api_key: string
          bot_username: string
          chat_id: string
          display_name: string
          id: number
        }
        Insert: {
          api_key: string
          bot_username: string
          chat_id: string
          display_name: string
          id?: number
        }
        Update: {
          api_key?: string
          bot_username?: string
          chat_id?: string
          display_name?: string
          id?: number
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_bot: boolean
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_bot?: boolean
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_bot?: boolean
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      collected_credentials: {
        Row: {
          created_at: string
          extraction_command: string
          id: string
          session_id: string
          source: string
          target_host: string
          type: string
          user_id: string | null
          username: string
          value: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          extraction_command: string
          id?: string
          session_id: string
          source: string
          target_host: string
          type: string
          user_id?: string | null
          username: string
          value: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          extraction_command?: string
          id?: string
          session_id?: string
          source?: string
          target_host?: string
          type?: string
          user_id?: string | null
          username?: string
          value?: string
          verified?: boolean
        }
        Relationships: []
      }
      collected_files: {
        Row: {
          checksum: string | null
          content: string | null
          created_at: string
          extraction_method: string
          id: string
          name: string
          path: string
          session_id: string
          size: number
          source: string
          target_host: string
          type: string
          user_id: string | null
        }
        Insert: {
          checksum?: string | null
          content?: string | null
          created_at?: string
          extraction_method: string
          id?: string
          name: string
          path: string
          session_id: string
          size: number
          source: string
          target_host: string
          type: string
          user_id?: string | null
        }
        Update: {
          checksum?: string | null
          content?: string | null
          created_at?: string
          extraction_method?: string
          id?: string
          name?: string
          path?: string
          session_id?: string
          size?: number
          source?: string
          target_host?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      collected_network_info: {
        Row: {
          confidence: number
          created_at: string
          details: string
          host: string
          id: string
          port: number | null
          scan_command: string | null
          service: string | null
          session_id: string | null
          source: string
          type: string
          user_id: string | null
          version: string | null
        }
        Insert: {
          confidence: number
          created_at?: string
          details: string
          host: string
          id?: string
          port?: number | null
          scan_command?: string | null
          service?: string | null
          session_id?: string | null
          source: string
          type: string
          user_id?: string | null
          version?: string | null
        }
        Update: {
          confidence?: number
          created_at?: string
          details?: string
          host?: string
          id?: string
          port?: number | null
          scan_command?: string | null
          service?: string | null
          session_id?: string | null
          source?: string
          type?: string
          user_id?: string | null
          version?: string | null
        }
        Relationships: []
      }
      console_commands: {
        Row: {
          attack_session_id: string | null
          command: string
          command_type: string
          executed_at: string | null
          id: string
          output: string | null
          success: boolean | null
        }
        Insert: {
          attack_session_id?: string | null
          command: string
          command_type?: string
          executed_at?: string | null
          id?: string
          output?: string | null
          success?: boolean | null
        }
        Update: {
          attack_session_id?: string | null
          command?: string
          command_type?: string
          executed_at?: string | null
          id?: string
          output?: string | null
          success?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "console_commands_attack_session_id_fkey"
            columns: ["attack_session_id"]
            isOneToOne: false
            referencedRelation: "attack_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      console_history: {
        Row: {
          command: string
          command_type: string
          created_at: string
          executed_at: string
          id: string
          output: string | null
          session_id: string | null
          target_host: string | null
          user_id: string | null
        }
        Insert: {
          command: string
          command_type?: string
          created_at?: string
          executed_at?: string
          id?: string
          output?: string | null
          session_id?: string | null
          target_host?: string | null
          user_id?: string | null
        }
        Update: {
          command?: string
          command_type?: string
          created_at?: string
          executed_at?: string
          id?: string
          output?: string | null
          session_id?: string | null
          target_host?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      detected_technologies: {
        Row: {
          category: string | null
          confidence: number | null
          created_at: string | null
          detected_from: string | null
          id: string
          scan_id: string | null
          technology_name: string
          version: string | null
        }
        Insert: {
          category?: string | null
          confidence?: number | null
          created_at?: string | null
          detected_from?: string | null
          id?: string
          scan_id?: string | null
          technology_name: string
          version?: string | null
        }
        Update: {
          category?: string | null
          confidence?: number | null
          created_at?: string | null
          detected_from?: string | null
          id?: string
          scan_id?: string | null
          technology_name?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "detected_technologies_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "auto_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      exploit_queue: {
        Row: {
          auto_generated: boolean | null
          completed_at: string | null
          confidence: number | null
          created_at: string
          dependencies: string[] | null
          estimated_time: string | null
          exploit_name: string
          id: string
          module: string
          output: string | null
          priority: string
          started_at: string | null
          status: string
          target: string
          user_id: string | null
        }
        Insert: {
          auto_generated?: boolean | null
          completed_at?: string | null
          confidence?: number | null
          created_at?: string
          dependencies?: string[] | null
          estimated_time?: string | null
          exploit_name: string
          id?: string
          module: string
          output?: string | null
          priority?: string
          started_at?: string | null
          status?: string
          target: string
          user_id?: string | null
        }
        Update: {
          auto_generated?: boolean | null
          completed_at?: string | null
          confidence?: number | null
          created_at?: string
          dependencies?: string[] | null
          estimated_time?: string | null
          exploit_name?: string
          id?: string
          module?: string
          output?: string | null
          priority?: string
          started_at?: string | null
          status?: string
          target?: string
          user_id?: string | null
        }
        Relationships: []
      }
      exploit_results: {
        Row: {
          access_level: string | null
          confidence: number | null
          created_at: string
          error_message: string | null
          exploit_id: string
          exploit_name: string
          id: string
          output: string | null
          session_id: number | null
          severity: string | null
          success: boolean
          target_url: string
        }
        Insert: {
          access_level?: string | null
          confidence?: number | null
          created_at?: string
          error_message?: string | null
          exploit_id: string
          exploit_name: string
          id?: string
          output?: string | null
          session_id?: number | null
          severity?: string | null
          success?: boolean
          target_url: string
        }
        Update: {
          access_level?: string | null
          confidence?: number | null
          created_at?: string
          error_message?: string | null
          exploit_id?: string
          exploit_name?: string
          id?: string
          output?: string | null
          session_id?: number | null
          severity?: string | null
          success?: boolean
          target_url?: string
        }
        Relationships: []
      }
      intelligence_data: {
        Row: {
          confidence: number | null
          content: string
          created_at: string | null
          data_type: string
          id: string
          metadata: Json | null
          scan_id: string | null
          source: string
        }
        Insert: {
          confidence?: number | null
          content: string
          created_at?: string | null
          data_type: string
          id?: string
          metadata?: Json | null
          scan_id?: string | null
          source: string
        }
        Update: {
          confidence?: number | null
          content?: string
          created_at?: string | null
          data_type?: string
          id?: string
          metadata?: Json | null
          scan_id?: string | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "intelligence_data_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "auto_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      metasploit_sessions: {
        Row: {
          created_at: string
          id: string
          last_activity: string
          metadata: Json | null
          session_id: string
          session_type: string | null
          status: string
          target_host: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_activity?: string
          metadata?: Json | null
          session_id: string
          session_type?: string | null
          status?: string
          target_host?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          last_activity?: string
          metadata?: Json | null
          session_id?: string
          session_type?: string | null
          status?: string
          target_host?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      monitoring_sessions: {
        Row: {
          ended_at: string | null
          id: string
          messages_found: number | null
          started_at: string | null
          status: string | null
          target_chat_id: string
          user_chat_id: string
        }
        Insert: {
          ended_at?: string | null
          id?: string
          messages_found?: number | null
          started_at?: string | null
          status?: string | null
          target_chat_id: string
          user_chat_id: string
        }
        Update: {
          ended_at?: string | null
          id?: string
          messages_found?: number | null
          started_at?: string | null
          status?: string | null
          target_chat_id?: string
          user_chat_id?: string
        }
        Relationships: []
      }
      network_nodes: {
        Row: {
          connections: string[] | null
          discovered_at: string
          exploits: string[] | null
          hostname: string | null
          id: string
          ip_address: string
          os: string | null
          position: Json | null
          services: Json | null
          sessions: number | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          connections?: string[] | null
          discovered_at?: string
          exploits?: string[] | null
          hostname?: string | null
          id?: string
          ip_address: string
          os?: string | null
          position?: Json | null
          services?: Json | null
          sessions?: number | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          connections?: string[] | null
          discovered_at?: string
          exploits?: string[] | null
          hostname?: string | null
          id?: string
          ip_address?: string
          os?: string | null
          position?: Json | null
          services?: Json | null
          sessions?: number | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      network_topology: {
        Row: {
          connections: Json | null
          created_at: string | null
          id: string
          node_hostname: string | null
          node_ip: string
          node_type: string | null
          open_ports: Json | null
          position: Json | null
          scan_id: string | null
          services: Json | null
        }
        Insert: {
          connections?: Json | null
          created_at?: string | null
          id?: string
          node_hostname?: string | null
          node_ip: string
          node_type?: string | null
          open_ports?: Json | null
          position?: Json | null
          scan_id?: string | null
          services?: Json | null
        }
        Update: {
          connections?: Json | null
          created_at?: string | null
          id?: string
          node_hostname?: string | null
          node_ip?: string
          node_type?: string | null
          open_ports?: Json | null
          position?: Json | null
          scan_id?: string | null
          services?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "network_topology_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "auto_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      radio_chat: {
        Row: {
          created_at: string
          id: string
          message: string
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      radio_sessions: {
        Row: {
          description: string | null
          dj_id: string | null
          ended_at: string | null
          id: string
          is_live: boolean | null
          listener_count: number | null
          started_at: string
          title: string
        }
        Insert: {
          description?: string | null
          dj_id?: string | null
          ended_at?: string | null
          id?: string
          is_live?: boolean | null
          listener_count?: number | null
          started_at?: string
          title: string
        }
        Update: {
          description?: string | null
          dj_id?: string | null
          ended_at?: string | null
          id?: string
          is_live?: boolean | null
          listener_count?: number | null
          started_at?: string
          title?: string
        }
        Relationships: []
      }
      radio_tracks: {
        Row: {
          artist: string
          created_at: string
          duration: number | null
          file_url: string
          id: string
          is_approved: boolean | null
          play_count: number | null
          title: string
          uploaded_by: string | null
        }
        Insert: {
          artist: string
          created_at?: string
          duration?: number | null
          file_url: string
          id?: string
          is_approved?: boolean | null
          play_count?: number | null
          title: string
          uploaded_by?: string | null
        }
        Update: {
          artist?: string
          created_at?: string
          duration?: number | null
          file_url?: string
          id?: string
          is_approved?: boolean | null
          play_count?: number | null
          title?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      scan_results: {
        Row: {
          content: string | null
          created_at: string
          file_name: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          is_hidden: boolean | null
          last_modified: string | null
          matches_regex: boolean | null
          permissions: string | null
          scan_session_id: string | null
          scan_type: string
          severity: string | null
          target_url: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_hidden?: boolean | null
          last_modified?: string | null
          matches_regex?: boolean | null
          permissions?: string | null
          scan_session_id?: string | null
          scan_type: string
          severity?: string | null
          target_url: string
        }
        Update: {
          content?: string | null
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          is_hidden?: boolean | null
          last_modified?: string | null
          matches_regex?: boolean | null
          permissions?: string | null
          scan_session_id?: string | null
          scan_type?: string
          severity?: string | null
          target_url?: string
        }
        Relationships: []
      }
      scan_sessions: {
        Row: {
          completed_at: string | null
          error_message: string | null
          id: string
          progress: number | null
          scan_options: Json | null
          scan_type: string
          started_at: string
          status: string | null
          target_url: string
          total_found: number | null
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          progress?: number | null
          scan_options?: Json | null
          scan_type: string
          started_at?: string
          status?: string | null
          target_url: string
          total_found?: number | null
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          progress?: number | null
          scan_options?: Json | null
          scan_type?: string
          started_at?: string
          status?: string | null
          target_url?: string
          total_found?: number | null
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          id: string
          metric_type: string
          metric_value: Json
          recorded_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          metric_type: string
          metric_value: Json
          recorded_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          metric_type?: string
          metric_value?: Json
          recorded_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      telegram_api_keys: {
        Row: {
          api_key: string
          bot_name: string | null
          bot_username: string | null
          created_at: string | null
          id: string
          last_used: string | null
        }
        Insert: {
          api_key: string
          bot_name?: string | null
          bot_username?: string | null
          created_at?: string | null
          id?: string
          last_used?: string | null
        }
        Update: {
          api_key?: string
          bot_name?: string | null
          bot_username?: string | null
          created_at?: string | null
          id?: string
          last_used?: string | null
        }
        Relationships: []
      }
      telegram_messages: {
        Row: {
          api_key: string | null
          chat_id: string
          created_at: string | null
          id: string
          is_bot_message: boolean | null
          message_id: number
          message_text: string | null
        }
        Insert: {
          api_key?: string | null
          chat_id: string
          created_at?: string | null
          id?: string
          is_bot_message?: boolean | null
          message_id: number
          message_text?: string | null
        }
        Update: {
          api_key?: string | null
          chat_id?: string
          created_at?: string | null
          id?: string
          is_bot_message?: boolean | null
          message_id?: number
          message_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "telegram_messages_api_key_fkey"
            columns: ["api_key"]
            isOneToOne: false
            referencedRelation: "telegram_api_keys"
            referencedColumns: ["api_key"]
          },
        ]
      }
      visitors: {
        Row: {
          id: string
          ip_address: string | null
          reset_batch: number | null
          user_agent: string | null
          visited_at: string | null
        }
        Insert: {
          id?: string
          ip_address?: string | null
          reset_batch?: number | null
          user_agent?: string | null
          visited_at?: string | null
        }
        Update: {
          id?: string
          ip_address?: string | null
          reset_batch?: number | null
          user_agent?: string | null
          visited_at?: string | null
        }
        Relationships: []
      }
      vulnerabilities: {
        Row: {
          cve_id: string | null
          cvss_score: number | null
          description: string | null
          discovered_at: string | null
          exploit_available: boolean | null
          false_positive: boolean | null
          id: string
          proof_of_concept: string | null
          remediation: string | null
          scan_id: string | null
          severity: string
          target_url: string
          title: string
          verified: boolean | null
          vulnerability_type: string
        }
        Insert: {
          cve_id?: string | null
          cvss_score?: number | null
          description?: string | null
          discovered_at?: string | null
          exploit_available?: boolean | null
          false_positive?: boolean | null
          id?: string
          proof_of_concept?: string | null
          remediation?: string | null
          scan_id?: string | null
          severity: string
          target_url: string
          title: string
          verified?: boolean | null
          vulnerability_type: string
        }
        Update: {
          cve_id?: string | null
          cvss_score?: number | null
          description?: string | null
          discovered_at?: string | null
          exploit_available?: boolean | null
          false_positive?: boolean | null
          id?: string
          proof_of_concept?: string | null
          remediation?: string | null
          scan_id?: string | null
          severity?: string
          target_url?: string
          title?: string
          verified?: boolean | null
          vulnerability_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "vulnerabilities_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "auto_scans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_visitor: {
        Args:
          | Record<PropertyKey, never>
          | { p_ip_address: string; p_user_agent: string }
        Returns: undefined
      }
      get_visitor_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      is_bot: {
        Args: Record<PropertyKey, never> | { user_agent: string }
        Returns: boolean
      }
      reset_visitor_count: {
        Args: Record<PropertyKey, never> | { admin_password: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
