class AddUsedFreeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :used_free, :boolean, default:true
  end
end
