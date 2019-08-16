class CreateProjectSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :project_settings do |t|
      t.string :github_token
      t.string :github_repository
      t.date :project_start_date
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
